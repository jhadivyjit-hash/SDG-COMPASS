import streamlit as st
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import random

# --- PAGE SETUP ---
st.set_page_config(
    page_title="SDG Life Compass",
    page_icon="🌍",
    layout="wide"
)

# --- SESSION STATE INITIALIZATION ---
if "streak" not in st.session_state:
    st.session_state.streak = 12
if "overall_score" not in st.session_state:
    st.session_state.overall_score = 72
if "sdg_scores" not in st.session_state:
    st.session_state.sdg_scores = {
        f"SDG {i}": random.randint(30, 95) for i in range(1, 18)
    }
if "weekly_trend" not in st.session_state:
    st.session_state.weekly_trend = pd.DataFrame({
        "Day": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        "Score": [55, 62, 58, 65, 70, 68, 74]
    })

# --- SIDEBAR NAVIGATION ---
st.sidebar.title("🌍 SDG Compass")
st.sidebar.caption("Every Action Counts")
st.sidebar.markdown("---")

menu = st.sidebar.radio(
    "Navigation Menu",
    ["🏠 Home", "📊 Dashboard", "✅ Daily Check-in", "📚 SDG Library", "💡 Recommendations", "👤 Profile"]
)

st.sidebar.markdown("---")
gemini_key = st.sidebar.text_input("🔑 Optional: Enter Gemini API Key for AI Partner", type="password")

# --- 1. HOMEPAGE ---
if menu == "🏠 Home":
    st.title("Small Steps,")
    st.markdown("<h1 style='color: #16a34a; margin-top: -25px;'>Big Impact.</h1>", unsafe_allow_html=True)
    
    st.subheader("Track your daily actions, improve your SDG scores, and contribute to a better tomorrow.")
    st.write("""
    Welcome to **SDG Life Compass**! Answer daily quick check-ins, keep your consistency score high, 
    track your contribution across all 17 Sustainable Development Goals, and get custom advice from your AI Eco-Partner.
    """)
    st.info("👉 Use the left sidebar menu to navigate to your **Dashboard** or start a **Daily Check-in**!")

# --- 2. DASHBOARD ---
elif menu == "📊 Dashboard":
    st.title("Dashboard")
    st.markdown("### Hello, Ananya! 👋")
    st.caption("Keep going! Your daily actions matter.")
    
    # Top Metric Cards
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric(label="Overall SDG Score", value=f"{st.session_state.overall_score}/100", delta="+2 today")
    with col2:
        st.metric(label="Today's Score", value="74/100", delta="+6 from yesterday")
    with col3:
        st.metric(label="This Week Average", value="68/100", delta="+8 from last week")
    with col4:
        st.metric(label="Your Streak 🔥", value=f"{st.session_state.streak} Days", delta="Keep it up!")
        
    st.markdown("---")
    
    # Visualizations Section
    chart_col1, chart_col2 = st.columns([1, 1])
    
    with chart_col1:
        st.subheader("SDG Score Overview (All 17 Goals)")
        df_sdg = pd.DataFrame({
            "SDG": list(st.session_state.sdg_scores.keys()),
            "Score": list(st.session_state.sdg_scores.values())
        })
        fig_bar = px.bar(df_sdg, x="SDG", y="Score", color="Score", color_continuous_scale="Greens", range_y=[0, 100])
        fig_bar.update_layout(xaxis_tickangle=-45, showlegend=False, height=350)
        st.plotly_chart(fig_bar, use_container_width=True)
        
    with chart_col2:
        st.subheader("Weekly Score Trend")
        fig_line = px.line(st.session_state.weekly_trend, x="Day", y="Score", markers=True, range_y=[0, 100])
        fig_line.update_traces(line_color="#16a34a", line_width=3)
        fig_line.update_layout(height=350)
        st.plotly_chart(fig_line, use_container_width=True)

# --- 3. DAILY CHECK-IN (WITH TRICK QUESTION / LIE DETECTION) ---
elif menu == "✅ Daily Check-in":
    st.title("Daily Check-in Questionnaire")
    st.caption("Answer accurately! Our consistency filter cross-checks responses to prevent cheating.")
    
    with st.form("sdg_quiz"):
        st.subheader("Goal 6: Clean Water and Sanitation 🚰")
        
        # Primary Question
        q1 = st.radio(
            "Question 1: Did you turn off the tap while brushing your teeth today?",
            ["Yes, always", "Yes, sometimes", "No", "I don't remember"]
        )
        
        # Cross-validation / Trick Question
        st.subheader("Daily Activity Verification ⏱️")
        q2 = st.slider(
            "Question 2 (Verification): Roughly how many minutes was running tap water flowing in your bathroom overall today?",
            0, 30, 5
        )
        
        st.subheader("Goal 11 & 13: Climate & Transport 🚌")
        q3 = st.radio(
            "Question 3: How did you commute today?",
            ["Walked / Bicycle", "Public Transport / Metro", "Electric Vehicle", "Personal Gas Car"]
        )
        
        submit_btn = st.form_submit_button("Submit Answers")
        
    if submit_btn:
        # Trick Question Lie Detection Logic
        inconsistent = False
        if q1 == "Yes, always" and q2 > 10:
            inconsistent = True
            
        if inconsistent:
            st.error("⚠️ **Consistency Alert!** You indicated turning off the tap always, but logged >10 minutes of running water. Your score received a minor adjustment.")
            st.session_state.overall_score = max(0, st.session_state.overall_score - 3)
        else:
            st.success("✅ **Answers Verified!** You earned +10 points today for sustainable habits!")
            st.session_state.overall_score = min(100, st.session_state.overall_score + 5)
            st.session_state.streak += 1

# --- 4. RECOMMENDATIONS & AI ECO-PARTNER ---
elif menu == "💡 Recommendations":
    st.title("Personalized Eco-Recommendations")
    st.info("Based on your check-ins, your AI Eco-Partner identified these key areas for growth:")
    
    rec_col1, rec_col2 = st.columns([2, 1])
    
    with rec_col1:
        st.markdown("### 🎯 Recommended Micro-Actions")
        
        st.success("💧 **Reduce Water Waste (SDG 6)**\nTry keeping showers under 5 minutes tomorrow to earn **+10 points**.")
        st.warning("🍲 **Reduce Food Waste (SDG 12)**\nPlan your meals ahead and store fresh produce properly to earn **+12 points**.")
        st.info("🚲 **Eco-Friendly Transport (SDG 11)**\nWalk or use public transport for short trips to earn **+15 points**.")
        
    with rec_col2:
        st.markdown("### 🤖 AI Partner Chat")
        user_msg = st.text_input("Ask your AI Eco-Partner for advice:")
        
        if st.button("Ask AI"):
            if user_msg:
                if gemini_key:
                    try:
                        from google import genai
                        client = genai.Client(api_key=gemini_key)
                        response = client.models.generate_content(
                            model="gemini-2.5-flash",
                            contents=f"You are a friendly SDG Eco-Coach. Give short, practical eco advice for: {user_msg}"
                        )
                        st.write(f"**AI Partner:** {response.text}")
                    except Exception as e:
                        st.error(f"Error connecting to Gemini API: {e}")
                else:
                    # Smart Mock Fallback when no API Key is entered
                    st.write("**AI Partner:** Try small daily adjustments! Shutting off the faucet while soaping up hands saves up to 6 liters of water per minute.")

# --- 5. SDG LIBRARY ---
elif menu == "📚 SDG Library":
    st.title("SDG Knowledge Library")
    st.write("Explore all 17 Sustainable Development Goals set by the United Nations.")
    
    sdg_choice = st.selectbox("Select a Goal to Learn More:", [
        "SDG 1: No Poverty",
        "SDG 6: Clean Water & Sanitation",
        "SDG 11: Sustainable Cities",
        "SDG 13: Climate Action"
    ])
    
    if "SDG 1:" in sdg_choice:
        st.markdown("### 🔴 Goal 1: No Poverty")
        st.write("End poverty in all its forms everywhere by 2030.")
        st.markdown("**Action items:** Support fair trade brands, donate unused clothes, and support local community businesses.")
    elif "SDG 6:" in sdg_choice:
        st.markdown("### 💧 Goal 6: Clean Water and Sanitation")
        st.write("Ensure availability and sustainable management of water and sanitation for all.")
        st.markdown("**Action items:** Fix leaking faucets, turn taps off while brushing, and avoid single-use plastic water bottles.")

# --- 6. PROFILE ---
elif menu == "👤 Profile":
    st.title("User Profile")
    
    prof_col1, prof_col2 = st.columns([1, 2])
    
    with prof_col1:
        st.image("https://api.dicebear.com/7.x/bottts/svg?seed=Ananya", width=150)
        st.markdown("### Ananya Sharma")
        st.caption("Level 3 • Green Tree 🌱")
        
    with prof_col2:
        st.write(f"**Total Points:** 1,250")
        st.write(f"**Days on Track:** {st.session_state.streak} Days")
        st.write("**Strongest Goals:** SDG 3 (Health), SDG 4 (Education)")
        st.write("**Needs Improvement:** SDG 6 (Clean Water), SDG 12 (Consumption)")
