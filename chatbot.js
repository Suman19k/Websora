const root = document.getElementById("chatbot-root");
const shadow = root.attachShadow({ mode: "open" });
shadow.innerHTML = `
<style>
* {
  box-sizing: border-box;
  font-family: "Segoe UI", sans-serif;
}

#chat-btn {
  position: fixed;
  bottom: 90px;
  right: 15px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
  z-index: 99999;
  overflow: visible;
}

/* Wave Effect */
#chat-btn::before,
#chat-btn::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(79, 70, 229, 0.4);
  animation: wave 2s infinite;
  z-index: -1;
}

#chat-btn::after {
  animation-delay: 1s;
}

/* Animation */
@keyframes wave {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  70% {
    transform: scale(1.8);
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

#chat-btn img {
  width: 26px;
}

/* Chat Box */
#chat-box {
  position: fixed;
  bottom: 100px;
  right: 25px;
  width: 320px;
  height: 500px;
  background: #ffffff;
  border-radius: 18px;
  display: none;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.5);
  z-index: 99999;
  transition: opacity 0.3s ease;
}

/* Header */
#chat-header {
  padding: 12px;
  background: linear-gradient(135deg, #4f46e5, #9333ea);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo {
  width: 28px;
  height: 28px;
  border-radius: 6px;
}

#close-btn {
  cursor: pointer;
}

/* Messages */
#chat-messages {
  flex: 1;
  padding: 12px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
  background: #f5f7fb;
}

.msg {
  padding: 8px 12px;
  border-radius: 10px;
  max-width: 75%;
  font-size: 13px;
}

.user {
  align-self: flex-end;
  background: #4f46e5;
  color: #fff;
}

.bot {
  align-self: flex-start;
  background: #e5e7eb;
  color: #111;
}

/* Suggestions */
.suggestions {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 5px;
}

.suggestions button {
  background: #eef2ff;
  border: 1px solid #c7d2fe;
  border-radius: 15px;
  padding: 6px 10px;
  font-size: 12px;
  cursor: pointer;
  color: #3730a3;
}

.suggestions button:hover {
  background: #4f46e5;
  color: #fff;
}

/* Input */
#chat-input {
  display: flex;
  padding: 8px;
  gap: 8px;
  border-top: 1px solid #eee;
}

#chat-input input {
  flex: 1;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #ddd;
}

#chat-input button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #4f46e5;
  border: none;
  color: white;
  cursor: pointer;
}
  /* Typing Indicator */
.typing {
  display: flex;
  align-items: center;
  gap: 6px;
}

.typing img {
  width: 18px;
  height: 18px;
  border-radius: 4px;
}

.dots {
  display: flex;
  gap: 3px;
}

.dots span {
  width: 5px;
  height: 5px;
  background: #555;
  border-radius: 50%;
  animation: blink 1.4s infinite;
}

.dots span:nth-child(2) { animation-delay: 0.2s; }
.dots span:nth-child(3) { animation-delay: 0.4s; }

@keyframes blink {
  0%, 80%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
</style>

<div id="chat-btn">
  <img src="assets/img/chat.png" />
</div>

<div id="chat-box">
  <div id="chat-header">
    <div class="header-left">
      <img src="assets/img/logo.png" class="logo"/>
      <span>Websora AI Assistant</span>
    </div>
    <span id="close-btn">✖</span>
  </div>

  <div id="chat-messages"></div>

  <div id="chat-input">
    <input type="text" id="user-input" placeholder="Ask something..." />
    <button id="send-btn">➤</button>
  </div>
</div>
`;

const chatBtn = shadow.getElementById("chat-btn");
const chatBox = shadow.getElementById("chat-box");
const messages = shadow.getElementById("chat-messages");
const input = shadow.getElementById("user-input");
const sendBtn = shadow.getElementById("send-btn");
const closeBtn = shadow.getElementById("close-btn");

chatBtn.onclick = () => {
  chatBox.style.display = chatBox.style.display === "flex" ? "none" : "flex";

  if (!chatBox.dataset.opened) {
    addMessage("Welcome to Websora - Tech Solutions!\n\nChoose a service below:", "bot")
      .then(() => {
        showMainMenu();
      });

    chatBox.dataset.opened = "true";
  }
};

closeBtn.onclick = () => {
  chatBox.style.display = "none";
};

function showTyping() {
  const msg = document.createElement("div");
  msg.className = "msg bot";

  msg.innerHTML = `
    <div style="display:flex; align-items:center; gap:6px;">
      <img src="assets/img/logo.png" style="width:18px;height:18px;border-radius:4px;" />
      <div style="display:flex; gap:3px;">
        <span style="width:5px;height:5px;background:#555;border-radius:50%;animation:blink 1.4s infinite;"></span>
        <span style="width:5px;height:5px;background:#555;border-radius:50%;animation:blink 1.4s infinite 0.2s;"></span>
        <span style="width:5px;height:5px;background:#555;border-radius:50%;animation:blink 1.4s infinite 0.4s;"></span>
      </div>
    </div>
  `;

  messages.appendChild(msg);
  scrollToBottom();
  return msg;
}

function typeMessage(el, text, done, speed = 35) {
  let i = 0;

  function typing() {
    if (i < text.length) {
      el.innerHTML += text[i] === "\n" ? "<br>" : text[i];
      i++;
      setTimeout(typing, speed);
    } else {
      done && done();
    }
  }

  typing();
}

function addMessage(text, type) {
  return new Promise((resolve) => {
    if (type === "user") {
      const msg = document.createElement("div");
      msg.className = "msg user";
      msg.innerText = text;
      messages.appendChild(msg);
      scrollToBottom();
      resolve();
      return;
    }

    const typingEl = showTyping();
    let delay = Math.min(1500, text.length * 15);

    setTimeout(() => {
      typingEl.remove();

      const msg = document.createElement("div");
      msg.className = "msg bot";
      messages.appendChild(msg);

      typeMessage(msg, text, () => {
        scrollToBottom();
        resolve();
      });

    }, delay);
  });
}

function scrollToBottom() {
  messages.scrollTop = messages.scrollHeight;
}

function showMainMenu() {
  showDynamicSuggestions([
    "Website Development",
    "SEO Services",
    "Digital Marketing",
    "Business Analytics",
    "Engineering Projects",
    "Pricing",
    "Contact Us"
  ]);
}

function showDynamicSuggestions(options) {
  const old = messages.querySelector(".suggestions");
  if (old) old.remove();

  const container = document.createElement("div");
  container.className = "suggestions";

  options.forEach(text => {
    const btn = document.createElement("button");
    btn.innerText = text;

    btn.onclick = () => {
      addMessage(text, "user").then(() => {
        handleUserSelection(text);
      });
    };

    container.appendChild(btn);
  });

  messages.appendChild(container);
  scrollToBottom();
}

function handleUserSelection(input) {
  let reply = "";
  let followUps = [];
  let isFinalStep = false;

  function mapUserInput(text) {
    text = text.toLowerCase();
    const directMap = {
      "website development": "website development",
      "business website": "business website",
      "e-commerce website": "e-commerce website",
      "portfolio website": "portfolio website",

      "new business": "new business",
      "existing business": "existing business",

      "less than 50": "less than 50",
      "50-200": "50-200",
      "200+": "200+",

      "jobs": "jobs",
      "freelancing": "freelancing",
      "personal brand": "personal brand",

      "features": "features",
      "timeline": "timeline",
      "yes, urgent": "yes, urgent",
      "no rush": "no rush",

      "payment integration": "payment integration",

      "design options": "design options",
      "seo setup": "seo setup",

      "seo services": "seo services",
      "on-page seo": "on-page seo",
      "off-page seo": "off-page seo",
      "technical seo": "technical seo",

      "digital marketing": "digital marketing",
      "social media marketing": "social media marketing",
      "paid ads (ppc)": "paid ads (ppc)",
      "content marketing": "content marketing",

      "engineering projects": "engineering projects",
      "final year project": "final year project",
      "mini project": "mini project",
      "project guidance": "project guidance",

      "business analytics": "business analytics",
      "dashboard development": "dashboard development",
      "data analysis": "data analysis",
      "reporting & insights": "reporting & insights",

      "pricing": "pricing",
      "contact expert": "contact expert"
    };

    if (directMap[text]) {
      return directMap[text];
    }

    if (/(hi|hello|hey|good morning|good afternoon|good evening)/.test(text)) {
      return "greeting";
    }

    if (/(business website|company site|business)/.test(text)) {
      return "business website";
    }

    if (/(ecommerce|e-commerce|store|sell online)/.test(text)) {
      return "e-commerce website";
    }

    if (/(portfolio|design|ui|ux|poster)/.test(text)) {
      return "portfolio website";
    }

    if (/(web|website|development|build site)/.test(text)) {
      return "website development";
    }

    if (/(seo|ranking|google)/.test(text)) {
      return "seo services";
    }

    if (/(marketing|digital|ads|promotion|content)/.test(text)) {
      return "digital marketing";
    }

    if (/(project|projects|final year|engineering)/.test(text)) {
      return "engineering projects";
    }

    if (/(data|analytics|dashboard|analysis)/.test(text)) {
      return "business analytics";
    }

    if (/(price|cost|budget|pricing)/.test(text)) {
      return "pricing";
    }

    if (/(contact|call|phone|email)/.test(text)) {
      return "contact expert";
    }

    return text.toLowerCase();
  }

  let text = mapUserInput(input).toLowerCase();

  switch (text) {

  case "greeting":
    reply = "Hello 👋\n\nWelcome to Websora.\n\nWe specialize in high-performance websites, digital marketing, engineering solutions, and data-driven strategies.\n\nHow can we assist you today?";
    followUps = ["Website Development", "SEO Services", "Digital Marketing", "Business Analytics", "Engineering Projects", "Pricing"];
    break;

  case "website development":
    reply = "Great choice 👍\n\nA professionally built website strengthens your brand presence and attracts the right audience.\n\nWhat type of website would you like to create?";
    followUps = ["Business Website", "E-commerce Website", "Portfolio Website"];
    break;

  case "business website":
    reply = "Excellent decision 💼\n\nA business website helps establish credibility and generate high-quality leads.\n\nIs this for a new venture or an existing business?";
    followUps = ["New Business", "Existing Business", "Features", "Pricing"];
    break;

  case "e-commerce website":
    reply = "Great choice 🚀\n\nWe build secure, scalable e-commerce platforms optimized for performance and conversions.\n\nHow many products are you planning to list?";
    followUps = ["Less than 50", "50-200", "200+", "Payment Integration", "Pricing"];
    break;

  case "portfolio website":
    reply = "Nice choice 👌\n\nA well-designed portfolio helps you stand out and showcase your work effectively.\n\nWhat is your primary goal?";
    followUps = ["Jobs", "Freelancing", "Personal Brand", "Design Options", "Pricing"];
    break;

  case "new business":
  case "existing business":
    reply = "Got it 👍\n\nWe’ll design your website with a strong focus on conversions, user experience, and scalability.\n\nWould you like to explore features or pricing?";
    followUps = ["Features", "Pricing"];
    break;

  case "less than 50":
  case "50-200":
  case "200+":
    reply = "Perfect 👍\n\nWe’ll structure your e-commerce platform for smooth performance, scalability, and seamless user experience.\n\nWhat would you like to explore next?";
    followUps = ["Payment Integration", "Pricing"];
    break;

  case "jobs":
  case "freelancing":
  case "personal brand":
    reply = "That’s great 👍\n\nWe’ll tailor the design to align with your goals and create a strong professional impact.\n\nWhat would you like to explore next?";
    followUps = ["Design Options", "Pricing"];
    break;

  case "features":
    reply = "Here’s what we include in our websites:\n\n✔ Modern & premium UI/UX design\n✔ Fully responsive across all devices\n✔ SEO-optimized structure\n✔ Fast, secure, and scalable performance\n\nWhat would you like to explore next?";
    followUps = ["Timeline", "Pricing"];
    break;

  case "timeline":
    reply = "Typical timelines:\n\n• Basic Website → 5–7 days\n• Advanced Website → 1–3 weeks\n\nDo you have a specific deadline?";
    followUps = ["Yes, urgent", "No rush", "Pricing"];
    break;

  case "yes, urgent":
    reply = "No problem ⚡\n\nWe can fast-track your project based on your deadline.\n\nLet’s connect and finalize the details.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
    break;

  case "no rush":
    reply = "Perfect 👍\n\nWe’ll focus on delivering high-quality results with proper planning and execution.\n\nWhat would you like to explore next?";
    followUps = ["Pricing", "Features"];
    break;

  case "payment integration":
    reply = "We integrate secure payment gateways such as Razorpay, Stripe, and PayPal to ensure smooth and reliable transactions.\n\nWhat would you like to explore next?";
    followUps = ["Features", "Pricing"];
    break;

  case "design options":
    reply = "We offer both fully custom designs and premium template-based solutions tailored to your business needs and budget.\n\nWhat would you like to explore next?";
    followUps = ["SEO Setup", "Pricing"];
    break;

  case "seo setup":
    reply = "We implement complete SEO setup including meta optimization, sitemap configuration, indexing, and performance improvements.\n\nWhat would you like to explore next?";
    followUps = ["SEO Services", "Pricing"];
    break;

  case "seo services":
    reply = "SEO helps improve your Google rankings and increase organic traffic 📈\n\nWhich area would you like to focus on?";
    followUps = ["On-page SEO", "Off-page SEO", "Technical SEO"];
    break;

  case "on-page seo":
  case "off-page seo":
  case "technical seo":
    reply = "We handle this using proven strategies and industry best practices to deliver measurable results.\n\nLet’s connect to discuss your requirements in detail.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
    break;

  case "digital marketing":
    reply = "Let’s grow your brand 📢\n\nWhich area are you interested in?";
    followUps = ["Social Media Marketing", "Paid Ads (PPC)", "Content Marketing"];
    break;

  case "social media marketing":
  case "paid ads (ppc)":
  case "content marketing":
    reply = "We create data-driven marketing strategies designed to generate leads and maximize ROI 🎯\n\nLet’s connect and plan your campaign.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
    break;

  case "engineering projects":
    reply = "We provide complete support for academic and technical projects 🎓\n\nWhat type of assistance do you need?";
    followUps = ["Final Year Project", "Mini Project", "Project Guidance"];
    break;

  case "final year project":
  case "mini project":
  case "project guidance":
  case "idea selection":
  case "documentation":
  case "topics":
    reply = "We’ll guide you through the entire process — from idea selection to final implementation 💯\n\nLet’s connect with our expert team for detailed support.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
    break;

  case "business analytics":
    reply = "We provide data-driven insights to help you make smarter business decisions 📊\n\nWhat would you like to explore?";
    followUps = ["Dashboard Development", "Data Analysis", "Reporting & Insights"];
    break;

  case "dashboard development":
    reply = "We build interactive dashboards that simplify complex data and provide actionable insights 📈\n\nWhat would you like to explore next?";
    followUps = ["Pricing", "Contact Expert"];
    break;

  case "data analysis":
  case "reporting & insights":
    reply = "We deliver meaningful insights that help optimize performance and improve business strategy.\n\nLet’s connect to discuss your requirements.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
    break;

  case "pricing":
    reply = "Our pricing is flexible and depends on your specific requirements, features, and project scope.\n\nLet’s connect to provide you with an accurate quote.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
    break;

  case "contact expert":
    reply = "📞 +91 7892964739\n📧 info@Websora.in\n\nOur team will connect with you shortly to assist further.";
    isFinalStep = true;
    break;

  default:
    reply = "I may not have fully understood your request.\n\nPlease connect with our expert team for further assistance.";
    followUps = ["Contact Expert"];
    isFinalStep = true;
}
  addMessage(reply, "bot").then(() => {

    if (isFinalStep) {
      addMessage("Would you like to connect with an expert? 👇", "bot")
        .then(() => {
          showDynamicSuggestions(["Contact Expert"]);

          setTimeout(() => {
            addMessage("Or explore services below 👇", "bot")
              .then(() => showMainMenu());
          }, 800);
        });
      return;
    }

    if (followUps.length > 0) {
      addMessage("Choose an option 👇", "bot")
        .then(() => showDynamicSuggestions(followUps));
    } else {
      showMainMenu();
    }

  });
}

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;

  addMessage(text, "user").then(() => {
    handleUserSelection(text);
  });

  input.value = "";
}

sendBtn.addEventListener("click", sendMessage);
input.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.1
});

const reveals = document.querySelectorAll(".reveal");

function revealAll() {
  const triggerPoint = window.innerHeight * 0.85;
  let visibleIndex = 0;

  reveals.forEach((el) => {
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < triggerPoint && !el.classList.contains("active")) {
      setTimeout(() => {
        el.classList.add("active");
      }, visibleIndex * 120);

      visibleIndex++;
    }
  });
}

window.addEventListener("scroll", revealAll);
window.addEventListener("load", revealAll);

window.addEventListener("load", function () {
  const preloader = document.querySelector(".site-preloader");

  if (preloader) {
    preloader.style.opacity = "0";
    preloader.style.visibility = "hidden";

    setTimeout(() => {
      preloader.remove(); 
    }, 600);
  }
});

document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll('.ticker-tech .ul-ticker-slider').forEach(slider => {
    new Splide(slider, {
      type: 'loop',
      arrows: false,
      pagination: false,
      drag: false,
      autoplay: false,
    }).mount();
  });

});