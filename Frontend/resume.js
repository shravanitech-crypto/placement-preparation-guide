async function analyzeResume() {

    const fileInput = document.getElementById("resumeFile");
    const jobDesc = document.getElementById("jobDescription").value.toLowerCase();

    if (!fileInput.files.length || jobDesc.trim() === "") {
        alert("Upload resume and paste job description.");
        return;
    }

    const reader = new FileReader();

    reader.onload = async function () {
        const typedarray = new Uint8Array(reader.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;

        let resumeText = "";

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            resumeText += textContent.items.map(item => item.str).join(" ");
        }

        smartATS(resumeText.toLowerCase(), jobDesc);
    };

    reader.readAsArrayBuffer(fileInput.files[0]);
}

function smartATS(resume, jd) {

    const scoreElement = document.getElementById("score");
    const missingList = document.getElementById("missingKeywords");
    const optimizedBox = document.getElementById("optimizedResume");

    let score = 0;
    let suggestions = [];
    let improvedContent = "";

    /* 1️⃣ JOB TITLE MATCH */
    const jobTitle = jd.split(" ").slice(0,2).join(" ");
    if (resume.includes(jobTitle)) {
        score += 15;
    } else {
        suggestions.push("Add exact job title in Professional Summary.");
    }

    /* 2️⃣ KEYWORD MATCHING */
    const jdWords = jd.match(/\b[a-z]{4,}\b/g) || [];
    const uniqueJD = [...new Set(jdWords)];

    let matchCount = 0;
    let missing = [];

    uniqueJD.forEach(word => {
        if (resume.includes(word)) matchCount++;
        else missing.push(word);
    });

    let keywordScore = Math.round((matchCount / uniqueJD.length) * 40);
    score += keywordScore;

    /* 3️⃣ MEASURABLE ACHIEVEMENTS CHECK */
    if (resume.match(/\d+%|\d+ percent|\d+ users|\d+ clients/)) {
        score += 15;
    } else {
        suggestions.push("Add quantifiable achievements (e.g., increased performance by 30%).");
    }

    /* 4️⃣ STRONG ACTION VERBS CHECK */
    const strongVerbs = ["developed","implemented","optimized","designed","engineered","achieved"];
    let verbMatch = strongVerbs.some(v => resume.includes(v));
    if (verbMatch) score += 10;
    else suggestions.push("Use strong action verbs like Developed, Implemented, Optimized.");

    /* 5️⃣ SUMMARY SECTION */
    if (resume.includes("professional summary")) score += 10;
    else suggestions.push("Add Professional Summary section at top.");

    /* 6️⃣ SKILL ALIGNMENT */
    let skillMatch = uniqueJD.filter(word => resume.includes(word)).length;
    if (skillMatch > 10) score += 10;
    else suggestions.push("Increase skill alignment with job description.");

    if (score > 100) score = 100;
    scoreElement.innerText = score + "%";

    /* SHOW MISSING KEYWORDS */
    missingList.innerHTML = "";
    missing.slice(0,10).forEach(word => {
        let li = document.createElement("li");
        li.textContent = word;
        missingList.appendChild(li);
    });

    /* GENERATE IMPROVED RESUME */
    improvedContent = generateImprovedResume(jobTitle, missing.slice(0,8));

    optimizedBox.value = improvedContent;

    document.getElementById("results").classList.remove("hidden");
}

function generateImprovedResume(jobTitle, keywords) {

    return `
PROFESSIONAL SUMMARY
Results-driven ${jobTitle} with proven expertise in ${keywords.join(", ")}.
Skilled in building scalable, high-performance solutions that improve business efficiency and system reliability.
Delivered measurable results including performance improvements of 35% and operational cost reduction by 20%.

SKILLS
${keywords.join(", ")}, Problem Solving, Agile Methodology, REST APIs, Database Optimization

EXPERIENCE
• Developed scalable backend systems improving response time by 40%.
• Implemented optimized database queries reducing load time by 30%.
• Designed and deployed applications serving 10,000+ users efficiently.
• Achieved 25% increase in productivity through automation solutions.

PROJECTS
• Built full-stack applications integrating modern development technologies.
• Engineered RESTful APIs ensuring high reliability and system security.

EDUCATION
Bachelor of Engineering in Computer Science

CONTACT
Email: your.email@example.com
Phone: 1234567890
`;
}