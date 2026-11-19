  const solutionData = {
      stressors: {
        badge: "SOLUTION 01 · STRESSORS",
        title: "Stressors & Burnout Recovery",
        description: "Supportive 1-on-1 sessions designed for adolescents and young adults navigating academic pressure, social transitions, and everyday overwhelm.",
        points: [
          "Targeted strategies for academic, family, and digital stress",
          "Practical nervous-system resets between sessions",
          "Flexible pacing tailored to your weekly schedule"
        ]
      },
      trauma: {
        badge: "SOLUTION 02 · TRAUMA",
        title: "Trauma-Informed Therapy",
        description: "Safe, grounded clinical guidance that respects emotional boundaries while helping clients process past events at a sustainable pace.",
        points: [
          "Compassionate, non-judgmental therapeutic space",
          "Stabilization and safety tools before deeper work",
          "Specialized support for youth and young adults"
        ]
      },
      coping: {
        badge: "SOLUTION 03 · COPING",
        title: "Coping & Emotional Resilience",
        description: "Build durable habits for handling anxiety, mood shifts, and high-pressure moments with clarity and confidence.",
        points: [
          "Actionable cognitive and behavioral coping frameworks",
          "Real-world habit building for daily routines",
          "Clear reflection tools after every session"
        ]
      },
      career: {
        badge: "SOLUTION 04 · CAREER",
        title: "Career & Direction Coaching-Therapy",
        description: "Navigate major academic choices, early-career transitions, and identity questions without losing sight of mental well-being.",
        points: [
          "Clarity around strengths, values, and next steps",
          "Support for imposter feelings and decision fatigue",
          "Structured guidance for students and young professionals"
        ]
      },
      process: {
        badge: "SOLUTION 05 · THE THERAPY PROCESS",
        title: "The Therapy Process",
        description: "A clear, modern process built to strip away clinical friction—from initial matching to active 1-on-1 sessions and ongoing progress.",
        points: [
          "Step 1: Quick intake focused on your goals and comfort",
          "Step 2: Priority matching or immediate tier onboarding",
          "Step 3: Focused 1-on-1 sessions designed to leave you feeling better"
        ]
      }
    };

    const solutionCards = document.querySelectorAll(".solution-card");
    const detailBadge = document.getElementById("detailBadge");
    const detailTitle = document.getElementById("detailTitle");
    const detailDescription = document.getElementById("detailDescription");
    const detailPoints = document.getElementById("detailPoints");

    solutionCards.forEach((card) => {
      card.addEventListener("click", () => {
        solutionCards.forEach((c) => {
          c.classList.remove("active");
          c.setAttribute("aria-selected", "false");
        });
        card.classList.add("active");
        card.setAttribute("aria-selected", "true");

        const key = card.dataset.solution;
        const item = solutionData[key];
        if (!item) return;

        detailBadge.textContent = item.badge;
        detailTitle.textContent = item.title;
        detailDescription.textContent = item.description;
        detailPoints.innerHTML = item.points.map((pt) => `<li>${pt}</li>`).join("");
      });
    });

    const modal = document.getElementById("inquiryModal");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const doneModalBtn = document.getElementById("doneModalBtn");
    const selectedTierInput = document.getElementById("selectedTierInput");
    const modalSubtitle = document.getElementById("modalSubtitle");
    const consultationForm = document.getElementById("consultationForm");
    const modalConfirmation = document.getElementById("modalConfirmation");
    const confirmedTierLabel = document.getElementById("confirmedTierLabel");

    function openInquiryModal(tierLabel) {
      const label = tierLabel || "General Consultation";
      selectedTierInput.value = label;
      confirmedTierLabel.textContent = label;
      modalSubtitle.textContent = `Selected option: ${label}. Share your details below to connect with our team.`;
      consultationForm.hidden = false;
      modalConfirmation.hidden = true;
      modal.classList.add("open");
      modal.setAttribute("aria-hidden", "false");
    }

    function closeInquiryModal() {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
    }

    document.querySelectorAll("[data-tier]").forEach((el) => {
      el.addEventListener("click", () => {
        openInquiryModal(el.dataset.tier);
      });
    });

    document.querySelectorAll("[data-select-tier]").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        openInquiryModal(link.dataset.selectTier);
      });
    });

    closeModalBtn.addEventListener("click", closeInquiryModal);
    doneModalBtn.addEventListener("click", closeInquiryModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeInquiryModal();
    });

    consultationForm.addEventListener("submit", (e) => {
      e.preventDefault();
      consultationForm.hidden = true;
      modalConfirmation.hidden = false;
      consultationForm.reset();
    });

    const copyToast = document.getElementById("copyToast");
    let toastTimer;

    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.dataset.copy;
        try {
          await navigator.clipboard.writeText(text);
        } catch (_) {
          const temp = document.createElement("textarea");
          temp.value = text;
          document.body.appendChild(temp);
          temp.select();
          document.execCommand("copy");
          document.body.removeChild(temp);
        }
        copyToast.textContent = `Copied to clipboard: ${text}`;
        copyToast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          copyToast.classList.remove("show");
        }, 2401);
      });
    });
