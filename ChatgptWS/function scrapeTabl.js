function scrapeTable() {
  const skillsAnalyzerElements = Array.from(
    document.querySelectorAll(".skillsAnalyzer")
  ).slice(0, 2);
  const tableData = [];

  skillsAnalyzerElements.forEach((skillsAnalyzerElement) => {
    const skillNameElements =
      skillsAnalyzerElement.querySelectorAll(".skill-name .name");
    const skillNames = Array.from(skillNameElements).map((skillNameElement) =>
      skillNameElement.textContent.trim()
    );

    const skillResumeCountElements = skillsAnalyzerElement.querySelectorAll(
      ".skill-cell:nth-child(2) .count"
    );
    const skillResumeCount = Array.from(skillResumeCountElements).map(
      (countElement) => countElement.textContent.trim() || "0"
    );

    const skillJobDescriptionCountElements =
      skillsAnalyzerElement.querySelectorAll(".skill-cell:nth-child(3) .count");
    const skillJobDescriptionCount = Array.from(
      skillJobDescriptionCountElements
    ).map((countElement) => countElement.textContent.trim() || "0");

    const rowData = skillNames.map((name, index) => [
      name,
      skillResumeCount[index],
      skillJobDescriptionCount[index],
    ]);
    tableData.push(...rowData);
  });
  // Delay capturing job-related information
  setTimeout(() => {
    const jobDescription =
      document.querySelector(".jobs-description-content__text")?.innerText ||
      "Description not found";

    chrome.storage.local.set({ jobDescription: jobDescription });

    const targetEndpoint = "https://api.jobscan.co/v4/scan";
    const requestPayload = {
      cv: "Here's an example CV",
      coverletter: "",
      conversion_id: null,
      coverletter_conversion_id: null,
    };

    const msg1= `Act as a world-class Senior .NET Backend Developer and world best professional resume writer  specializing in optimizing resumes to align with job descriptions and getting shortlisted for interviews.

    ## Context
    You are applying for Senior .NET Backend Developer positions in linkedin and looking to optimize your resume with the job description to increase your chances of getting shortlisted for interviews by ATS as well as human recriters.
    
    ## Approach
    - Analyze the job description to identify top 3 skills that align with your expertise.
    - Create a compelling summary integrating keywords from the job description that showcases your 10 years of experience and notable achievements in software engineering.
    - Craft a concise summary for each of your previous positions (Takumi, Esshva, and Ewings) integrating relevant keywords from the job description.
    - Develop achievement-driven bullet points for each position using the STAR (Situation/Task/Action/Result) method and quantifying achievements with numbers/percentages.
    - List technical skills that align with the job description and also must have technicles skills I posess and soft skills relevant to the role.
    
    ## Response Format
    Present the details as a JSON file including the job description details, optimized resume summary, achievement-driven bullet points, technical skill sets, and soft skill sets.Each bullet point should begin with a strong action verb, describe the task, and conclude with a action which leads to quantified achievement or result between 25 to 35 words in length
     
    ## Instructions
    - Gather the job description, related keywords and provide my original work experience using a prompt after this.
    
    - Use exact spellings and forms from the job description for skills and keywords integration.
    
    - Craft each summary to be a minimum of 25 words and cover all relevant experience for the position concisely.
    
    - Ensure achievement-driven bullet points are between 25 to 35 words and quantify relevant achievements.
    
    - Categorize technical skills into relevant main tech stack and use exact spellings and forms from the job description.
          Below are must have technicle skills for any
     
          Programming: C#, Dart, JavasScript, TypeScript, Jquery, Java, SQL programming
          Frameworks: DotNET, .Net Core, Microsoft ASP.NET, Angular, React.js, Bootstrap, Flutter, NUnit
          Databases: Microsoft SQL server, Mongo DB, MySQL, Firebase firestore, Azure SQL
          Cloud computing : Saas, PaaS, Microsoft Azure, GCP Google cloud platform), AWS Cloud, Azure Devops, EKS
          Tools: Git, TFS, Jenkins, Docker, Kubernetes, RabbitMQ, Postman, GitHub, GitLab, JIRA
          Methodology: Scrum methodology, Kanban, SOLID, TDD, DDD
          object-oriented programming (OOP),OO design (OOD)
          Languages: HTML, CSS, HTML5, CSS3, XML, JSON, SQL, 
          Web Services: .NET Core Web API, REST, SOAP 
          Testing: Unit Testing, Integration testing, System Testing, 
          Management:Sprint palnning, Retrospective, Reviews 
          Others: AJAX, OAuth, MVC, Data structures & algorithms, Stored procedures
    
    - List soft skills mentioned in the job description using their exact form.
    
          example keys in result json-
    
          position - position of the job description eg- .NET Developer
    
          maintech - read the job description and the my orginal work experience I will give you andsing that identify the top 3 skills that shows why I m the best match for the given job description, seperated by | operator 
          eg - .NET Core | C# | Azure DevOps
    
          summary - compelling resume summary that highlights my 10 number of years of experience in the software engineering field
             Showcase how my professional background and expertise can address the company's major pain points. Mention my notable accomplishment 
             of software engineering. Conclude by emphasizing my expertise is .NET . remember dont use words like\"I\" ,"my" also keep it simple and maimm 5 centence alone with must have keywords from job descryption which I posess .integrate exact must have keywords from job description which i poosses and include in summary. remeber this is my summaray in resume.make it consise maximum 5 lines. avoid repetition  of  key words and verbs whenever posible 
             eg:
             Accomplished Senior .NET Developer with extensive experience in building scalable web applications using .NET Core, C#, and AWS. Adept at driving Agile development methodologies, focusing on solution design and technical specifications to deliver high-quality software. Expertise in cloud services, particularly AWS, and proficient in implementing CI/CD pipelines and microservice architecture for enterprise solutions.
    
    
          takmisummary - this is summary which covers all  my resposibilities and what I do in consise form showcassing major skills i posess as a .net engineer. at  my current postion as Tech lead in takumi.  provide a one or two-sentence compelling summary which has at least 25 words. Avoid repetitive keywords and ensure all achievements are technically sensible, believable, and relevant to the actual actions. 
             Make sure you the summary is minimum 25 words long and covering all experience for the position consisely and this mandatory.
             
             eg - Leading a team in developing mobile and web apps, enhancing application scalability, security, and user experience with .NET Core, Angular, and Redis, while focusing on code qulity, enterprise solution design and technical specifications.
             
          takumibulletpoints - This is an arry of at least 4 achievement-driven bullet points following the STAR( Situation /task/ action/ reslt) method for my current postion as Tech lead in takumi. .Bullet point must be more than 25 words long and maximum 35 words long.It shold not be too short and it must perfectly make sense and show my expertise using (sitation/task /action/r reslt). Start each bullet point with an strong action verb, followed by the task, and conclude with ta related achivemnt or result. Please quantify the bullet points using numbers, percentages whenever possible .Remember each qantitavie aachivement must be technically make sense and completly realated to action. Ensure each bullet point quantifies results with numbers/percentages which are belivable and relevent to acttions and relevent to each position and job title, uses strong action verbs . 1 - bullet point at least cover one key skill keyword mentioned in the job description with exact spelings and the form. avoid repetition  of  key words and verbs whenever posible,
             Note- Make sure each bulletpont has minimum 25 words, have a task, related action and related result or achivement. and technicall makes sense all together.
             
             example of good bullet point showcasing everything mentioned above - Streamlined project development operations using C# and Reactjs with Redux, launched automated testing for improved code
             reliability and maintained unit tests for quality assurance, resulting in a reduction of 1-2 days for quality releases 
          
             
          essawasummary - this is summary which covers all  my resposibilities and what I do in consise form showcassing major skills i posess as a .net engineer. at  my  postion as senior .net developer in esshva.  provide a one or two-sentence compelling summary which has at least 25 words. Avoid repetitive keywords and ensure all achievements are technically sensible, believable, and relevant to the actual actions. 
          Make sure you the summary is minimum 25 words long and covering all experience for the position consisely and this mandatory.
    
          eg - Leading a team in developing mobile and web apps, enhancing application scalability, security, and user experience with .NET Core, Angular, and Redis, while focusing on code qulity, enterprise solution design and technical specifications.
    
          esshvabulletpoints - 
          - This is an arry of at least 4 achievement-driven bullet points following the STAR( Situation /task/ action/ reslt) method for my  postion as senior .net developer in esshva. .Bullet point must be more than 25 words long and maximum 35 words long.It shold not be too short and it must perfectly make sense and show my expertise using (sitation/task /action/r reslt). Start each bullet point with an strong action verb, followed by the task, and conclude with ta related achivemnt or result. Please quantify the bullet points using numbers, percentages whenever possible .Remember each qantitavie aachivement must be technically make sense and completly realated to action. Ensure each bullet point quantifies results with numbers/percentages which are belivable and relevent to acttions and relevent to each position and job title, uses strong action verbs . 1 - bullet point at least cover one key skill keyword mentioned in the job description with exact spelings and the form. avoid repetition  of  key words and verbs whenever posible,
          Note- Make sure each bulletpont has minimum 25 words, have a task, related action and related result or achivement. and technicall makes sense all together.
    
          example of good bullet point showcasing everything mentioned above - Streamlined project development operations using C# and Reactjs with Redux, launched automated testing for improved code
          reliability and maintained unit tests for quality assurance, resulting in a reduction of 1-2 days for quality releases 
    
          ewingsummary - this is summary which covers all  my resposibilities and what I do in consise form showcassing major skills i posess as a .net engineer. at  my  postion as senior .net developer in ewings.  provide a one or two-sentence compelling summary which has at least 25 words. Avoid repetitive keywords and ensure all achievements are technically sensible, believable, and relevant to the actual actions. 
          Make sure you the summary is minimum 25 words long and covering all experience for the position consisely and this mandatory.
    
          eg - Leading a team in developing mobile and web apps, enhancing application scalability, security, and user experience with .NET Core, Angular, and Redis, while focusing on code qulity, enterprise solution design and technical specifications.
    
          ewingbuletpoints - This is an arry of at least 4 achievement-driven bullet points following the STAR( Situation /task/ action/ reslt) method for my  postion as senior .net developer in ewings. .Bullet point must be more than 25 words long and maximum 35 words long.It shold not be too short and it must perfectly make sense and show my expertise using (sitation/task /action/r reslt). Start each bullet point with an strong action verb, followed by the task, and conclude with ta related achivemnt or result. Please quantify the bullet points using numbers, percentages whenever possible .Remember each qantitavie aachivement must be technically make sense and completly realated to action. Ensure each bullet point quantifies results with numbers/percentages which are belivable and relevent to acttions and relevent to each position and job title, uses strong action verbs . 1 - bullet point at least cover one key skill keyword mentioned in the job description with exact spelings and the form. avoid repetition  of  key words and verbs whenever posible,
          Note- Make sure each bulletpont has minimum 25 words, have a task, related action and related result or achivement. and technicall makes sense all together.
    
          example of good bullet point showcasing everything mentioned above - Streamlined project development operations using C# and Reactjs with Redux, launched automated testing for improved code
          reliability and maintained unit tests for quality assurance, resulting in a reduction of 1-2 days for quality releases 
    
          hardskillset- 
          eg - technicle skills I posses which are well aligned with the job description and best technicle skills I orginally posses and show my expetise in  .NET/CI/CDD/Cloud/Database/frontend skills  that .NET senior software enginner must have. When you list down skill correctly catergerize in to releven main tech stack and use exact spelings and form from job description.
             [ "Methodology: Scrum methodology, SOLID principles, object-oriented programming (OOP)",
             "Languages: HTML, CSS, SQL, T-SQL"]
    
             list of technicle skills of all skills I posess- Programming: C#, Dart, Java Script, TypeScript, Jquery,
             Java, Python , VB.NET , SQL programming
             Frameworks: DotNET, .Net Core, Microsoft ASP.NET,
             ADO.NET, WCF, WPF, Angular, Angularjs, React.js,
             Node.js, Bootstrap, Flutter, Material Design, NUnit
             Databases: Microsoft SQL server, Mongo DB, MySQL,
             Firebase firestore, Oracle, Redis, Elasticsearch, Azure SQL
             Cloud computing : Saas, PaaS, Microsoft Azure, GCP
             (Google cloud platform), AWS Cloud, Azure Devops, EKS
             Tools: Git, TFS, Jenkins, Docker, Kubernetes, Postman,
             GitHub, GitLab, JIRA
             Methodology: Scrum methodology, Kanban, SOLID, TDD, DDD
             object-oriented programming (OOP),OO design (OOD)
             Languages: HTML, CSS, HTML5, CSS3, XML, JSON,
             LINQ, SQL, T-SQL, ES6, AJAX
             Technical Writing: Technical Manuals, User Manuals,
             Technical Design Documents
             Web Services: Web API, REST, SOAP 
             Testing: Unit Testing, Integration testing, System Testing, 
             Management: Project Planning, Release Management,
             Change Management, Agile Project Management
             Others: RabbitMQ, OAuth, IIS, Microsoft visual studio,
             MVC, Data structures & algorithms, Stored procedures
             
          softskillset -  Soft skills ever .net senior developer must have and soft skiills mention in job description. When you list down skill use exact spelings and form from job description.
          eg:
             ["Committed and Adaptability to Change",
             "Leadership",
             "Mentorship",
             "Agile Development Methodologies"]
    
    
    
    
    
    
    
    
    
    =================================================================================================================
    After done all above finally 
    1  ensure bullet points are minimum 25 words long and emphsize responsibilities/actions and showcase the relevent result or achivement of the action
    2. ensure each summary section is comeling and show case,emphsize and cover all related data.
    3. ensure "maintech" part in json correctly emphsize top 3 skills required by the job description.
    4  ensure that all keywords are 100% included in the summary, bullet points, technical skills, or soft skills sections, according to relevance.
    5. ensure all blletpoints are based on what I have really done by cross checking it with my real job experience that I will provide you.
    3. After including the keywords, double-check the CV JSON to ensure that it is completely aligned with the job description. Make any necessary improvements to enhance the quality of the CV.
    4. Ensure that each phrase and section in the CV makes complete sense and is technically coherent. Do not include unbelievable accomplishments or unrelated achievements in the bullet points.
    5. Every accomplishment, result, or achievement in the bullet points should be complete and should accurately reflect your experiences.
    Sure, I can guide you through the process of optimizing your resume for a Senior .NET Backend Developer position as described. Before I start crafting your optimized resume summary, achievement-driven bullet points, technical and soft skills list, could you provide the job description you're targeting? This will help me identify the top skills and keywords needed to tailor your resume effectively. Also, please share your original work experience details for the positions at Takumi, Esshva, and Ewings to ensure the achievements and responsibilities align accurately with what you have truly done.`
    const ms = `I m good than other because my very fast ability to adpt to any new technology. Also come upwith solutions for many problems in short period of time.

                Takumi:

                Worked as a tech lead with 5 team members reporting to you
                Worked on BillPal - an expense management system
                Used Flutter for mobile app, Angular for web app, and .NET Core for web API
                Implemented OCR scanning of bills using ML Vision Flutter package
                Stored bill data in Flutter Firestore
                Allowed users to categorize bill data
                Provided notifications when expense limits were exceeded
                Predicted future expenses weekly and monthly
                Visualized expense analytics on mobile and web using Fusion Sync Fusion Charts
                Generated reports using RDLC
                Used Identity Server JWT for authentication, previously used Firebase Authentication
                Used Firebase Firestore for storing bills
                Utilized Azure DevOps and Azure SQL Database
                Introduced clean architecture for mobile and .NET Core API projects
                Guided team to create Angular web app
                Introduced SOLID principles, dependency injection, code reviews
                Implemented CI/CD pipelines with unit testing
                Introduced TDD, Sentry error logging, RDLC reports, SignalR for real-time notifications
                Created database design
                Used Figma and wireframe designs
                Introduced Redmine for time management
                Used Jira for project management
                Performed requirements gathering to production release
                Followed SCRUM Agile with 2-week sprints
                Guided team through all of the above
                Used Angular for web app and .NET Core REST API
                Used Entity Framework
                Refactored legacy code, updated packages for security
                Implemented caching and query optimization
                Guided team to write proper unit tests
                Performed integration, manual, and regression testing
                Implemented proper coding practices, design patterns, exception handling
                Introduced remote work and pair programming
                Used browser developer tools, watchers, SQL Profiler, query execution plans for debugging
                Delivered more than 6 version updates
                Completed more than 15 sprints on time

                esshva:
                Worked as a sole backend developer with 3 frontend developers
                Built WebStory - a social network platform
                Actively involved in requirements gathering
                Designed architecture and database structure
                Implemented microservices architecture
                Used React with Redux for frontend
                Used Identity Server and .NET Core REST APIs for backend
                Implemented middlewares for logging and encryption
                Used MongoDB for friend management, post sharing, commenting
                Used DDD to identify needed microservices
                Implemented SignalR for notifications
                Used MSSQL database for storing user data
                Implemented asynchronous programming and Entity Framework
                Utilized AWS services (API Gateway, EKS, Docker), load balancing, Redis, RabbitMQ
                Implemented Saga pattern, CQRS with event sourcing
                Used Jenkins for automated microservice hosting on EKS in EC2 server
                Reduced bugs with proper testing, increased scalability
                Worked in a production support team, fixing critical bugs and performing hotfixes
                Worked directly with US client
                Created brain webber data analytics project
                Visualized large datasets using Power BI, Fusion Charts
                Created charts using widgets and dashboards
                Used SignalR for real-time chart updates
                Introduced KPIs
                Used Sentry with Dapper for REST API project
                Used Identity Server for authentication
                Used Angular for web applications

                ewings:
                Worked with a team of 3 members
                Built HostWeb custom CMS for automobile companies
                Implemented inventory management components
                Implemented drag and drop widgets
                Implemented advertisement management
                Implemented lead tracking
                Implemented SEO module
                Implemented Craigslist ad module
                Involved in 2-week sprints to develop new modules or add new functions
                Worked with a legacy system using AngularJS for web and .NET MVC for backend
                Used repositories and DAO patterns to interact with database`;

    const payload = { ...requestPayload, jd: jobDescription };
    fetch(targetEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        const softSkills = data.skills.soft
          .map((skill) => skill.skill)
          .join("\n");
        const hardSkills = data.skills.hard
          .map((skill) => skill.skill)
          .join("\n");

        const msg2 = `Keyword must have\n Soft Skills: ${softSkills} Hard Skills:\n ${hardSkills} \n
                ========================================================================================================= \n
                  Job Description \n
               ${jobDescription} \n

                =========================================================================================================== \n

                  Real work experience \n 
                  ${ms}`;

        const targetEndpoint = "http://localhost:3030/send-message";
        const requestPayload1 = { message: msg1 };
        const requestPayload2 = { message: msg2 };
        fetch(targetEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestPayload1),
        })
          .then((response) => response.json())
          .then((data) => {});

          setTimeout(() => { fetch(targetEndpoint, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload1),
          })
            .then((response) => response.json())
            .then((data) => {
                chrome.runtime.sendMessage({ action: "getJobDescription", data });
            });
            console.log("Timeout completed!");
          }, 5000);

       
      })
      .catch((error) => {});

    // Send the captured data
  

    chrome.runtime.sendMessage({ action: "getTableData", tableData });
  }, 5000); // Adjust the delay as needed, here it's 2000 milliseconds (2 seconds)
}

function escapeSpecialCharacters(inputString) {
  // Define a regular expression to match special characters
  const specialCharsRegex = /[\\\/'"\n]/g;

  // Replace each special character with its escaped version
  const escapedString = inputString.replace(specialCharsRegex, (match) => {
    switch (match) {
      case "\\":
        return "\\\\";
      case "/":
        return "\\/";
      case "'":
        return "\\'";
      case '"':
        return '\\"';
      case "\n":
        return "\\n";
      default:
        return match; // If the character is not special, return it unchanged
    }
  });

  return escapedString;
}

scrapeTable();

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "scrapeTable") {
    scrapeTable()
      .then((data) => {})
      .catch((err) => {
        console.error(err);
      });
  }

  return true;
});
