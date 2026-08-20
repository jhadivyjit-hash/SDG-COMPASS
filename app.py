import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import random

# --- 1. PAGE CONFIGURATION ---
st.set_page_config(
    page_title="SDG Life Compass",
    page_icon="🌍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# --- 2. EXACT SDG COLOR PALETTE & CUSTOM STYLING ---
SDG_COLORS = {
    "SDG 1: No Poverty": "#E5243B",
    "SDG 2: Zero Hunger": "#DDA63A",
    "SDG 3: Good Health": "#4C9F38",
    "SDG 4: Quality Education": "#C5192D",
    "SDG 5: Gender Equality": "#FF3A21",
    "SDG 6: Clean Water": "#26BDE2",
    "SDG 7: Affordable Energy": "#FCC30B",
    "SDG 8: Decent Work": "#A21942",
    "SDG 9: Innovation": "#FD6925",
    "SDG 10: Reduced Inequality": "#DD1367",
    "SDG 11: Sustainable Cities": "#FD9D24",
    "SDG 12: Responsible Consumption": "#BF8B2E",
    "SDG 13: Climate Action": "#3F7E44",
    "SDG 14: Life Below Water": "#0A97D9",
    "SDG 15: Life on Land": "#56C02B",
    "SDG 16: Peace & Justice": "#00689D",
    "SDG 17: Partnerships": "#19486A"
}

st.markdown("""
    <style>
    /* Global Card & Container Styling */
    .stApp { background-color: #F8FAFC; }
    
    .metric-card {
        background-color: #FFFFFF;
        border-radius: 12px;
        padding: 20px;
        border: 1px solid #E2E8F0;
        box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        text-align: center;
    }
    
    /* Green SDG Brand Accent */
    .stButton>button {
        background-color: #16A34A !important;
        color: white !important;
        border-radius: 20px !important;
        font-weight: bold !important;
        border: none !important;
    }
    
    /* Point Badges */
    .point-badge {
        background-color: #DCFCE7;
        color: #15803D;
        font-weight: bold;
        padding: 4px 12px;
        border-radius: 12px;
        float: right;
    }
    </style>
""", unsafe_allow_html=True)

# --- 3. SESSION STATE MANAGEMENT ---
if "logged_in" not in st.session_state:
    st.session_state.logged_in = False
if "username" not in st.session_state:
    st.session_state.username = "Ananya Sharma"
if "streak" not in st.session_state:
    st.session_state.streak = 12
if "overall_score" not in st.session_state:
    st.session_state.overall_score = 72
if "sdg_scores" not in st.session_state:
    st.session_state.sdg_scores = {f"SDG {i}": random.randint(30, 90) for i in range(1, 18)}

# --- 4. AUTHENTICATION (LOGIN / SIGN UP PAGE) ---
if not st.session_state.logged_in:
    col1, col2, col3 = st.columns([1, 2, 1])
    with col2:
        st.markdown("<h2 style='text-align: center;'>🌍 SDG Life Compass</h2>", unsafe_allow_html=True)
        st.markdown("<p style='text-align: center; color: #64748B;'>Every Action Counts. Sign in to track your SDG impact.</p>", unsafe_allow_html=True)
        
        tab_login, tab_signup = st.tabs(["🔑 Login", "📝 Sign Up"])
        
        with tab_login:
            email = st.text_input("Email Address", value="ananya@gmail.com")
            password = st.text_input("Password", type="password", value="password123")
            if st.button("Sign In", use_container_width=True):
                st.session_state.logged_in = True
                st.rerun()
                
        with tab_signup:
            new_name = st.text_input("Full Name")
            new_email = st.text_input("New Email")
            new_pass = st.text_input("Create Password", type="password")
            if st.button("Create Account", use_container_width=True):
                st.session_state.username = new_name if new_name else "New User"
                st.session_state.logged_in = True
                st.rerun()
    st.stop()

# --- 5. APP NAVIGATION (POST-LOGIN) ---
st.sidebar.title("🌍 SDG Compass")
st.sidebar.caption(f"Logged in as: **{st.session_state.username}**")
if st.sidebar.button("Logout"):
    st.session_state.logged_in = False
    st.rerun()

st.sidebar.markdown("---")
menu = st.sidebar.radio(
    "Navigation Menu",
    ["🏠 Home", "📊 Dashboard", "✅ Daily Check-in", "📚 SDG Library", "💡 Recommendations & AI", "👤 Profile"]
)

st.sidebar.markdown("---")
gemini_key = st.sidebar.text_input("🔑 Optional: Gemini API Key", type="password")

# --- 6. PAGE VIEWS ---

# HOMEPAGE
if menu == "🏠 Home":
    st.title("Small Steps,")
    st.markdown("<h1 style='color: #16A34A; margin-top: -25px;'>Big Impact.</h1>", unsafe_allow_html=True)
    st.subheader("Track your daily actions, improve your SDG scores, and contribute to a better tomorrow.")
    
    # UN SDG Color Banner
    cols = st.columns(6)
    sdg_list = list(SDG_COLORS.items())
    for idx, (name, color) in enumerate(sdg_list[:6]):
        with cols[idx]:
            st.markdown(f"<div style='background-color:{color}; color:white; padding:15px; border-radius:8px; text-align:center; font-weight:bold;'>{name.split(':')[0]}</div>", unsafe_allow_html=True)

# DASHBOARD
elif menu == "📊 Dashboard":
    st.title("Dashboard")
    st.markdown(f"### Hello, {st.session_state.username}! 👋")
    st.caption("Keep going! Your actions matter.")
    
    m1, m2, m3, m4 = st.columns(4)
    with m1:
        st.metric("Overall SDG Score", f"{st.session_state.overall_score}/100", "+2 today")
    with m2:
        st.metric("Today's Score", "74/100", "+6 yesterday")
    with m3:
        st.metric("This Week Average", "68/100", "+8 last week")
    with m4:
        st.metric("Your Streak 🔥", f"{st.session_state.streak} Days", "Level 3: Tree")

    st.markdown("---")
    c1, c2 = st.columns([1, 1])
    
    with c1:
        st.subheader("SDG Score Overview")
        df_sdg = pd.DataFrame({"SDG": list(st.session_state.sdg_scores.keys()), "Score": list(st.session_state.sdg_scores.values())})
        fig_bar = px.bar(df_sdg, x="SDG", y="Score", color="Score", color_continuous_scale="Viridis", range_y=[0, 100])
        fig_bar.update_layout(height=320, showlegend=False)
        st.plotly_chart(fig_bar, use_container_width=True)
        
    with c2:
        st.subheader("Score Trend")
        df_line = pd.DataFrame({"Day": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "Score": [55, 62, 58, 65, 70, 68, st.session_state.overall_score]})
        fig_line = px.line(df_line, x="Day", y="Score", markers=True, range_y=[0, 100])
        fig_line.update_traces(line_color="#16A34A", line_width=3)
        fig_line.update_layout(height=320)
        st.plotly_chart(fig_line, use_container_width=True)

# DAILY CHECK-IN (WITH LIE DETECTION / TRICK QUESTIONS)
elif menu == "✅ Daily Check-in":
    st.title("Daily Check-in")
    st.progress(0.22)
    st.caption("Question 4 of 18 • SDG 6: Clean Water and Sanitation")
    
    with st.form("quiz_form"):
        q1 = st.radio("Did you turn off the tap while brushing your teeth today?", ["Yes, always", "Yes, sometimes", "No", "I don't remember"])
        q2 = st.slider("Trick Check: How many minutes did you let tap water run continuously today?", 0, 30, 2)
        q3 = st.radio("How did you travel to school/work today?", ["Walked / Bicycle", "Public Bus / Metro", "Electric Vehicle", "Personal Gas Car"])
        
        submitted = st.form_submit_button("Next Question →")
        
    if submitted:
        # Consistency Check / Lie Detection Logic
        if q1 == "Yes, always" and q2 > 10:
            st.error("⚠️ **Consistency Alert Detected!** You indicated turning off the tap always, but logged over 10 minutes of continuous running water. Your consistency score was adjusted.")
            st.session_state.overall_score = max(0, st.session_state.overall_score - 2)
        else:
            st.success("✅ **Verified Response!** You earned +10 impact points today.")
            st.session_state.overall_score = min(100, st.session_state.overall_score + 4)

# RECOMMENDATIONS & AI PARTNER
elif menu == "💡 Recommendations & AI":
    st.title("Recommendations & AI Eco-Partner")
    
    c1, c2 = st.columns([2, 1])
    with c1:
        st.subheader("Personalized Suggestions")
        st.markdown("<div class='metric-card'><b>Reduce water waste</b> <span class='point-badge'>+10 pts</span><br><small>Try taking shorter showers and fix leaky faucets.</small></div>", unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)
        st.markdown("<div class='metric-card'><b>Reduce food waste</b> <span class='point-badge'>+12 pts</span><br><small>Plan your weekly meals and store food properly.</small></div>", unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)
        st.markdown("<div class='metric-card'><b>Use eco-friendly transport</b> <span class='point-badge'>+15 pts</span><br><small>Walk, cycle, or take public transit tomorrow.</small></div>", unsafe_allow_html=True)

    with c2:
        st.subheader("🤖 Chat with AI Partner")
        user_prompt = st.text_input("Ask advice to raise your score:")
        if st.button("Ask Partner"):
            if user_prompt:
                if gemini_key:
                    try:
                        from google import genai
                        client = genai.Client(api_key=gemini_key)
                        res = client.models.generate_content(
                            model="gemini-2.5-flash",
                            contents=f"You are an encouraging SDG Eco-Coach. Give 2 concise tips for: {user_prompt}"
                        )
                        st.info(f"**AI Coach:** {res.text}")
                    except Exception as e:
                        st.error(f"Gemini API Error: {e}")
                else:
                    st.info("**AI Coach:** Great question! Start by making one micro-change today—like taking a 5-minute shower or taking public transport once this week!")

# SDG LIBRARY
elif menu == "📚 SDG Library":
    st.title("SDG Library")
    st.text_input("🔍 Search SDGs...", placeholder="e.g. Water, Energy, Poverty")
    
    for name, color in SDG_COLORS.items():
        with st.expander(f"{name}"):
            st.markdown(f"<h3 style='color:{color};'>{name}</h3>", unsafe_allow_html=True)
            st.write("Understand the global target and check small actions you can take daily to contribute positively.")
            st.button(f"Take {name} Quiz", key=name)

# PROFILE
elif menu == "👤 Profile":
    st.title("User Profile")
    p1, p2 = st.columns([1, 2])
    with p1:
        st.image("https://api.dicebear.com/7.x/bottts/svg?seed=Ananya", width=140)
        st.markdown(f"### {st.session_state.username}")
        st.caption("Level 3 • Green Tree 🌱")
    with p2:
        st.write(" **Total Points:** 1,250")
        st.write(f" **Days on Track:** {st.session_state.streak}")
        st.write(" **Strongest Goals:** SDG 3 Good Health, SDG 4 Quality Education")
        st.write(" **Needs Improvement:** SDG 6 Clean Water, SDG 12 Responsible Consumption")
