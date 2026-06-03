const jobs = [
  { logo: "G", brand: "google", company: "Google", role: "Software Engineer Intern", status: "Under Review", date: "Applied on May 20, 2024" },
  { logo: "▦", brand: "microsoft", company: "Microsoft", role: "Software Engineer Intern", status: "Interview", date: "Applied on May 18, 2024" },
  { logo: "a", brand: "amazon", company: "Amazon", role: "Software Engineer Intern", status: "Under Review", date: "Applied on May 15, 2024" },
  { logo: "∞", brand: "meta", company: "Meta", role: "Software Engineer Intern", status: "Under Review", date: "Applied on May 8, 2024" }
];

const advice = [
  ["Understand OA and how recruiter use it to select candidate", "assets/p05_02_X4.png"],
  ["3 ways to prepare for video recording assessment", "assets/p05_05_X8.png"],
  ["Prepare OA with company value", "assets/p05_06_X7.png"],
  ["What to say in the OA?", "assets/p05_04_X12.png"],
  ["Understand OA and how recruiter use it to select candidate", "assets/p05_07_X10.png"]
];

const applications = [
  ["Early career program - Tech", "JP Morgan", "May 14, 2026", "Interview scheduled"],
  ["SDE", "Microsoft", "May 12, 2026", "Interview scheduled"],
  ["IT Specialists", "Slack", "May 12, 2026", "OA"],
  ["UX designer", "Figma", "May 12, 2026", "Submitted"],
  ["SWE", "Figma", "May 12, 2026", "Initial call"],
  ["SDE", "Snowflake", "May 12, 2026", "Submitted"],
  ["Jr. SWE", "Google", "May 11, 2026", "Submitted"],
  ["SDE", "Oracle", "May 11, 2026", "OA rejected"]
];

const stats = [
  ["8", "Total Applications", "bag", "purple"],
  ["3", "In Progress", "clock", "yellow"],
  ["4", "Interviews", "calendar", "green"],
  ["1", "Offers", "star", "violet"],
  ["0", "Rejections", "reject", "red"]
];

const metrics = [
  {
    title: "Response rate",
    tag: "Above Average",
    value: "67%",
    sub: "of applications",
    peer: "Peer average: 45%",
    width: "67%",
    body: "Your response rate is 22% above the peer average. This indicates your resume and cover letters are effectively capturing recruiter attention.",
    improve: "Continue tailoring applications to specific roles and companies."
  },
  {
    title: "Interview received",
    tag: "Above Average",
    value: "4",
    sub: "interviews",
    peer: "Peers: 2",
    width: "72%",
    body: "You're converting responses into interviews at a strong rate, receiving 2 more interviews than average.",
    improve: "Practice behavioral questions and research companies thoroughly before interviews."
  },
  {
    title: "Online Assessments",
    tag: "Below Average",
    value: "2",
    sub: "assessments",
    peer: "Peers: 3",
    width: "48%",
    warning: true,
    body: "You're receiving fewer OAs than average. This could mean you're advancing directly to interviews or applying to fewer OA-heavy roles.",
    improve: "Practice coding challenges on LeetCode/HackerRank if targeting tech roles."
  },
  {
    title: "Rejections",
    tag: "Above Average",
    value: "1",
    sub: "rejections",
    peer: "Peers: 4",
    width: "72%",
    body: "You're receiving fewer rejections than peers, which combined with your high response rate suggests you're targeting roles well-matched to your qualifications.",
    improve: "Rejections are part of the process. Stay persistent."
  },
  {
    title: "Average Time per Application",
    tag: "Above Average",
    value: "2.5",
    sub: "hours per application",
    peer: "Peers: 3.2 hours",
    width: "58%",
    wide: true,
    body: "You're completing applications 22% faster than peers. This efficiency is excellent, but ensure you're still tailoring each application to the specific role.",
    improve: "Use templates from your career center and advice in the blogs to maintain quality while staying efficient."
  }
];

const registerSteps = ["personal", "academic", "demographic"];
let registerIndex = 0;

const els = {
  auth: document.querySelector("#auth"),
  app: document.querySelector("#app"),
  toast: document.querySelector("#toast"),
  aiModal: document.querySelector("#aiModal"),
  applicationModal: document.querySelector("#applicationModal"),
  aiInsight: document.querySelector("#aiInsight")
};

function renderJobs() {
  document.querySelector("#jobRow").innerHTML = jobs.map((job) => `
    <article class="job-card">
      <div class="company-logo ${job.brand}">${job.logo}</div>
      <h3>${job.role}</h3>
      <p>${job.company}</p>
      <span class="status-pill">${job.status}</span>
      <p>${job.date}</p>
    </article>
  `).join("");
}

function renderAdvice() {
  document.querySelector("#adviceGrid").innerHTML = advice.map(([title, image]) => `
    <article class="advice-card">
      <div class="photo" style="background-image:url('${image}')"></div>
      <h3>${title}<button title="Open article" aria-label="Open article">↗</button></h3>
    </article>
  `).join("");
}

function renderStats() {
  document.querySelector("#submissionStats").innerHTML = stats.map(([number, label, icon, color]) => `
    <article class="stat-card">
      <div><strong>${number}</strong><span>${label}</span></div>
      <span class="stat-icon ${color}" data-icon="${icon}"></span>
    </article>
  `).join("");
}

function statusClass(status) {
  if (status.includes("Interview")) return "good";
  if (status.includes("rejected")) return "bad";
  if (status.includes("OA") || status.includes("Submitted")) return "warning";
  return "";
}

function renderApplications() {
  document.querySelector("#applicationsTable").innerHTML = applications.map((row) => `
    <tr>
      <td>${row[0]}</td><td>${row[1]}</td><td>${row[2]}</td>
      <td><span class="status-pill ${statusClass(row[3])}">${row[3]}</span></td>
    </tr>
  `).join("");
}

function renderMetrics() {
  document.querySelector("#metricsGrid").innerHTML = metrics.map((metric, index) => `
    <article class="metric-card ${metric.wide ? "wide" : ""}" data-metric-index="${index}">
      <h3>${metric.title}</h3>
      <span class="status-pill ${metric.warning ? "warning" : ""}">${metric.tag}</span>
      <div><span class="big">${metric.value}</span> <strong>${metric.sub}</strong></div>
      <div class="bar" style="--value:${metric.width}"><span></span></div>
      <small>${metric.peer}</small>
      <p><b>What this means:</b><br>${metric.body}</p>
      <p><b>${metric.wide ? "Tips" : "To improve"}:</b><br>${metric.improve}</p>
    </article>
  `).join("");
  document.querySelectorAll(".metric-card").forEach((card) => {
    card.addEventListener("click", () => {
      document.querySelectorAll(".metric-card").forEach((item) => item.classList.remove("selected"));
      card.classList.add("selected");
      renderAiInsight(metrics[Number(card.dataset.metricIndex)]);
    });
  });
  renderAiInsight(metrics[0]);
}

function renderAiInsight(metric) {
  els.aiInsight.innerHTML = `
    <h3>✓ ${metric.title}</h3>
    <span class="status-pill ${metric.warning ? "warning" : ""}">${metric.tag}</span>
    <div><span class="big">${metric.value}</span> <strong>${metric.sub}</strong></div>
    <div class="bar" style="--value:${metric.width}"><span></span></div>
    <small>${metric.peer}</small>
    <p><b>What this means:</b><br>${metric.body}</p>
    <p><b>To improve:</b> ${metric.improve}</p>
  `;
}

function showToast(message) {
  els.toast.textContent = message;
  els.toast.classList.remove("hidden");
  setTimeout(() => els.toast.classList.add("hidden"), 2400);
}

function setRegisterStep(nextIndex) {
  registerIndex = Math.max(0, Math.min(registerSteps.length - 1, nextIndex));
  const activeStep = registerSteps[registerIndex];

  document.querySelectorAll("[data-register-step]").forEach((button) => {
    button.classList.toggle("active", button.dataset.registerStep === activeStep);
  });
  document.querySelectorAll("[data-register-panel]").forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.registerPanel === activeStep);
  });

  document.querySelector("[data-register-prev]").classList.toggle("hidden", registerIndex === 0);
  document.querySelector("[data-register-next]").classList.toggle("hidden", registerIndex === registerSteps.length - 1);
  document.querySelector("[data-register-submit]").classList.toggle("hidden", registerIndex !== registerSteps.length - 1);
}

document.querySelectorAll("[data-auth-target]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-auth-view]").forEach((view) => view.classList.remove("active"));
    document.querySelector(`[data-auth-view="${button.dataset.authTarget}"]`).classList.add("active");
    setRegisterStep(0);
  });
});

document.querySelectorAll("[data-register-step]").forEach((button) => {
  button.addEventListener("click", () => setRegisterStep(registerSteps.indexOf(button.dataset.registerStep)));
});
document.querySelector("[data-register-prev]").addEventListener("click", () => setRegisterStep(registerIndex - 1));
document.querySelector("[data-register-next]").addEventListener("click", () => setRegisterStep(registerIndex + 1));

document.querySelectorAll("[data-enter-app]").forEach((button) => {
  button.addEventListener("click", () => {
    els.auth.classList.add("hidden");
    els.app.classList.remove("hidden");
  });
});

document.querySelector("[data-logout]").addEventListener("click", () => {
  els.app.classList.add("hidden");
  els.auth.classList.remove("hidden");
});

document.querySelectorAll("[data-page]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-page]").forEach((nav) => nav.classList.remove("active"));
    document.querySelectorAll("[data-page-view]").forEach((page) => page.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`[data-page-view="${button.dataset.page}"]`).classList.add("active");
  });
});

document.querySelector("#addApplication").addEventListener("click", () => {
  els.applicationModal.classList.remove("hidden");
  els.applicationModal.setAttribute("aria-hidden", "false");
});

document.querySelector("[data-close-application]").addEventListener("click", () => {
  els.applicationModal.classList.add("hidden");
  els.applicationModal.setAttribute("aria-hidden", "true");
});

document.querySelector("#applicationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  applications.unshift([
    form.get("position"),
    form.get("company"),
    form.get("date"),
    form.get("status")
  ]);
  renderApplications();
  stats[0][0] = String(Number(stats[0][0]) + 1);
  stats[1][0] = String(Number(stats[1][0]) + 1);
  renderStats();
  els.applicationModal.classList.add("hidden");
  els.applicationModal.setAttribute("aria-hidden", "true");
  showToast(`${form.get("company")} application added to My Submissions`);
});

document.querySelectorAll("[data-open-ai]").forEach((button) => {
  button.addEventListener("click", () => {
    els.aiModal.classList.remove("hidden");
    els.aiModal.setAttribute("aria-hidden", "false");
  });
});

document.querySelector("[data-close-ai]").addEventListener("click", () => {
  els.aiModal.classList.add("hidden");
  els.aiModal.setAttribute("aria-hidden", "true");
});

document.querySelectorAll(".prompt-chip").forEach((button, index) => {
  button.addEventListener("click", () => {
    const responses = [
      "Response rate is calculated by dividing applications that led to recruiter contact, OA, or interview by total applications submitted.",
      "Prioritize roles that match your resume keywords, tailor your bullets to the job description, and keep following up after high-fit applications."
    ];
    document.querySelector("#aiIntro").textContent = responses[index];
  });
});

renderJobs();
renderAdvice();
renderStats();
renderApplications();
renderMetrics();
setRegisterStep(0);
