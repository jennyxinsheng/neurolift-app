# NeuroLift Implementation Plan

## Objective
Build a cross-platform psychological fitness mobile app with social features, exercise tracking, insights, and subscription model, using black & white minimalistic UI.

## Technology Stack Recommendation
- **Framework**: React Native with Expo (cross-platform iOS/Android)
- **Language**: TypeScript
- **UI**: React Native Paper / NativeWind (Tailwind for RN)
- **Navigation**: React Navigation v6
- **State Management**: Zustand / Redux Toolkit
- **Backend**: Firebase (Auth, Firestore, Storage, Cloud Functions)
- **Notifications**: Expo Notifications + Firebase Cloud Messaging
- **Payments**: RevenueCat (subscription management)
- **Analytics**: Firebase Analytics

## Phase 1: Project Setup & Core Infrastructure

### 1.1 Initialize Project Structure
- Initialize Expo TypeScript project
- Configure app.json with NeuroLift branding
- Set up folder structure:
  - `/src/screens` (all screen components)
  - `/src/components` (reusable UI components)
  - `/src/navigation` (navigation configuration)
  - `/src/services` (Firebase, API integrations)
  - `/src/store` (state management)
  - `/src/types` (TypeScript definitions)
  - `/src/utils` (helpers, constants)
  - `/src/hooks` (custom React hooks)
  - `/assets` (logo, images)

### 1.2 Firebase Configuration
- Create Firebase project
- Enable Firebase Authentication (Apple, Google Sign-In)
- Set up Firestore database with security rules
- Configure Firebase Storage for photos/videos
- Set up Cloud Functions for backend logic
- Enable Firebase Analytics (anonymous data collection)

### 1.3 Database Schema Design (Firestore)

**Collections:**
- `users`
  - userId, email, displayName, photoURL, createdAt
  - contentmentScores: { initial: {...}, followUp: {...} }
  - subscriptionStatus, subscriptionTier
  
- `exercises`
  - exerciseId, name, description, domain (Kindness/Social/etc)
  - difficulty, duration, instructions
  
- `workouts` (preset programs)
  - workoutId, name, difficulty, exercises[], description
  
- `userPrograms`
  - userId, programId, customizedExercises[], schedule[], startDate
  
- `completedExercises`
  - userId, exerciseId, completedAt, photos[], videos[], journalEntry
  - isShared (boolean)
  
- `socialPosts`
  - postId, userId, type (exercise/insight/education), content
  - mediaUrls[], likes, comments[], createdAt
  
- `userInsights`
  - userId, weekStartDate, domainStats: { Kindness: X, Social: Y, ... }

## Phase 2: Authentication & Onboarding

### 2.1 Authentication Screens
- Splash screen with NeuroLift logo
- Welcome/Login screen with:
  - "Sign in with Apple" button
  - "Sign in with Google" button
  - Minimalistic black/white design

### 2.2 NeuroLift Contentment Assessment
- Create contentment assessment component (5 domains)
- Survey questions covering:
  - Positive Emotion
  - Engagement
  - Relationships
  - Meaning
  - Accomplishment
- Store initial baseline score
- Schedule 7-day follow-up trigger

### 2.3 Onboarding Flow
- Post-auth → Contentment Assessment → Main app entry
- Create skip functionality for returning users

## Phase 3: Main Navigation & Tab Structure

### 3.1 Bottom Tab Navigation (4 tabs)
- **Home (Feed)** - Social feed icon
- **BrainGym** - Exercise/workout icon
- **Insights** - Analytics/chart icon
- **Profile** - User profile icon

Black background, white icons, minimal design

## Phase 4: Home Tab (Social Feed)

### 4.1 Feed Screen
- Infinite scroll feed showing:
  - Completed exercises from other users
  - Positive effects/testimonials
  - Educational snippets on positive psychology
- Each post can include:
  - User avatar, name
  - Exercise completed / insight shared
  - Photos/videos (grid or carousel)
  - Like count, comment count
  - Timestamp

### 4.2 Post Interaction
- Like button
- Comment section
- Share functionality

### 4.3 Content Moderation
- Reported posts flagged for review
- Cloud Function to filter inappropriate content

## Phase 5: BrainGym Tab

### 5.1 Main BrainGym Screen
- **Quick Access Section**: Today's scheduled exercises
- **Preset Programs**: Beginner/Intermediate/Advanced workouts
- **Custom Workout Builder**
- **Calendar View** button (navigate to calendar)

### 5.2 Exercise Domain Organization
Create 5 domain categories:
- **Kindness**: Acts of kindness, gratitude journaling
- **Social Connection**: Reach out exercises, quality time
- **Time Affluence**: Mindfulness, time perception exercises
- **Healthy Physical Practices**: Movement, nutrition tracking
- **Mind Control**: Meditation, cognitive reframing

### 5.3 Preset Workout Programs
- Beginner (10-15 min/day)
- Intermediate (20-30 min/day)
- Advanced (40+ min/day)
- Each with curated exercise mix across all 5 domains

### 5.4 Custom Workout Builder
- Browse all exercises by domain
- Add/remove exercises to personal program
- Set frequency (daily/weekly schedule)
- Drag-to-reorder exercises

### 5.5 Calendar View
- Monthly calendar showing:
  - Scheduled exercises (outlined)
  - Completed exercises (filled)
- Tap date to see details
- Ability to reschedule exercises

### 5.6 Exercise Completion Flow
- Start exercise → Instructions/timer → Complete
- Add photos/videos
- Journal reflection (text input)
- Option to share publicly
- Mark as complete

## Phase 6: Insights Tab

### 6.1 Domain Distribution Visualization
- Pie chart or bar chart showing time invested per domain
- Week/Month/All-time toggles

### 6.2 Recommendations Engine
- Analyze user's domain balance
- Suggest exercises from neglected domains
- "Balance Your Practice" section with 3-5 suggested exercises

### 6.3 Streak & Stats
- Current streak (consecutive days)
- Total exercises completed
- Total time invested
- Weekly comparison (vs last week)

### 6.4 Weekly Review (Sunday nights or Monday mornings)
- Gamified summary:
  - "You meditated 3 times for 40 mins!"
  - Fun fact comparisons (e.g., gamma wave analogy)
  - Domain breakdown
  - Encouragement message
- Share to social feed option

## Phase 7: Profile Tab

### 7.1 Profile Header
- User avatar, name
- Edit profile button (top right corner)
- Total exercises, followers, following counts

### 7.2 Personal Feed
- Grid/list view of user's shared entries
- TikTok/Instagram style scrollable feed
- Filter by domain tags

### 7.3 Edit Profile Screen
- Change avatar
- Update display name
- Bio/about section
- Privacy settings

### 7.4 Settings
- Notification preferences
- Subscription management
- Privacy controls
- Logout

## Phase 8: Notification System

### 8.1 Morning Reminders
- Check user's scheduled exercises for the day
- Send gentle push notification: "Good morning! You have 3 exercises scheduled today"
- Time: User-configurable (default 8 AM)

### 8.2 Evening Check-ins
- Send reminder: "How did your practice go today?"
- Time: User-configurable (default 8 PM)
- Deep link to completion screen

### 8.3 Reschedule Flow
- If exercise not completed, show:
  - Mark as complete
  - Reschedule to tomorrow
  - Reschedule to specific date
  - Skip

## Phase 9: NeuroLift Contentment Re-assessment & Paywall

### 9.1 7-Day Follow-up Trigger
- After 7 days of ANY completed exercises
- Push notification: "Time to check your progress!"
- Re-administer NeuroLift Contentment Assessment

### 9.2 Score Comparison
- Calculate delta between initial and follow-up scores
- Visualize improvement/decline per domain
- Show overall change

### 9.3 Paywall Logic
- **If score increased**:
  - "You've improved your wellbeing! Keep the momentum going with premium access"
  - Highlight: Unlimited exercises, advanced programs, ad-free
  
- **If score unchanged**:
  - "Research shows 80% of users see improvement in 4 weeks"
  - Social proof: Success stories from other users
  
- **If score declined**:
  - "Have you experienced any stressful events recently?"
  - Empathy messaging: "Building resilience takes time, especially during challenges"
  - "Continue your journey with full access"

### 9.4 Subscription Tiers (RevenueCat)
- Free tier: Limited exercises, ads (if applicable)
- Premium Monthly: Full access
- Premium Annual: Full access + discount
- Apple/Google in-app purchase integration

## Phase 10: Exercise Content Population

### 10.1 Create Exercise Database
Seed Firestore with exercises across 5 domains:

**Kindness** (10-15 exercises):
- Random act of kindness
- Gratitude journaling
- Write a thank you note
- Compliment three people

**Social Connection** (10-15 exercises):
- Quality time with loved one
- Reach out to old friend
- Active listening practice
- Join a community activity

**Time Affluence** (10-15 exercises):
- 10-min mindfulness meditation
- Slow down a routine activity
- Digital detox hour
- Savoring exercise

**Healthy Physical Practices** (10-15 exercises):
- 20-min walk in nature
- Sleep hygiene check
- Hydration tracking
- Nutrition reflection

**Mind Control** (10-15 exercises):
- Cognitive reframing
- Thought labeling meditation
- Visualization exercise
- Breathing techniques (4-7-8, box breathing)

### 10.2 Preset Program Creation
- Design 3-5 preset programs mixing exercises
- Beginner: 1 exercise/day
- Intermediate: 2 exercises/day
- Advanced: 3+ exercises/day

## Phase 11: UI/UX Implementation

### 11.1 Design System
- **Colors**: Pure black (#000000), pure white (#FFFFFF), grays for shadows/dividers
- **Typography**: Clean sans-serif (Inter, SF Pro, Roboto)
- **Spacing**: Generous padding, maximize screen space
- **Icons**: Outline style, minimalistic
- **Images**: Black & white filters applied to user photos

### 11.2 Component Library
- Button (primary, secondary, ghost)
- Card (exercise card, post card)
- Input fields (journal, search)
- Modal (paywall, confirmations)
- Bottom sheet (exercise details)
- Progress indicators
- Avatar component
- Video/photo viewer

### 11.3 Animations
- Subtle transitions (fade, slide)
- Completion celebrations (confetti in black/white)
- Loading states

## Phase 12: Media Handling

### 12.1 Photo/Video Upload
- Expo Image Picker integration
- Resize/compress before upload
- Firebase Storage integration
- Generate thumbnails for videos
- Apply black & white filter

### 12.2 Media Display
- Grid layout for multiple photos
- Video player with controls
- Full-screen viewer
- Delete/edit options

## Phase 13: Analytics & Data Collection

### 13.1 Anonymous Analytics Events
- User signup
- Exercise completion (by domain)
- Contentment score deltas
- Subscription conversion
- Weekly active users
- Retention metrics

### 13.2 Privacy Compliance
- Anonymous data only
- GDPR/CCPA compliant
- Privacy policy integration
- User consent flows

## Phase 14: Testing & Quality Assurance

### 14.1 Unit Tests
- Utility functions
- State management logic
- Date/time calculations

### 14.2 Integration Tests
- Authentication flows
- Exercise completion flow
- Notification scheduling
- Subscription flow

### 14.3 E2E Tests
- Onboarding → Exercise → Completion
- Social feed interaction
- Paywall conversion

### 14.4 Device Testing
- iOS (multiple screen sizes)
- Android (multiple screen sizes)
- Performance profiling

## Phase 15: Deployment Preparation

### 15.1 App Store Assets
- App icon (use provided NeuroLift logo)
- Screenshots (all required sizes)
- App description
- Privacy policy
- Terms of service

### 15.2 Build Configuration
- Environment variables (dev/prod)
- Firebase config per environment
- Release signing (iOS/Android)
- App versioning

### 15.3 Submission
- iOS: App Store Connect
- Android: Google Play Console
- Beta testing via TestFlight/Internal Testing

## Verification & Definition of Done

### Per Phase Checklist:
- Code implemented and follows TypeScript best practices
- UI matches black/white minimalistic design
- Screen is responsive across device sizes
- Navigation flows work correctly
- Data persists to Firestore
- No console errors or warnings
- Tested on iOS and Android simulators/devices

### Overall Completion Criteria:
- All 4 tabs fully functional
- Authentication working (Apple + Google)
- Exercise completion + journaling working
- Social feed displays posts correctly
- Insights show accurate domain distribution
- Notifications scheduled and delivered
- NeuroLift Contentment Assessment + re-assessment working
- Paywall displays correctly based on score delta
- Subscription integration functional
- Weekly review generates and displays
- Calendar view accurate
- Photo/video upload and display working
- App builds successfully for iOS and Android
- Performance: App loads in <3s, smooth 60fps animations
- No memory leaks or crashes

## Dependencies & Sequencing

**Critical Path:**
1. Project setup → Firebase config → Auth screens
2. Navigation structure → Tab scaffolding
3. Exercise database population → BrainGym functionality
4. Completion flow → Social feed integration
5. Notifications → Contentment re-assessment → Paywall
6. Testing → Deployment

**Parallel Workstreams:**
- UI components can be built alongside feature development
- Exercise content creation can happen independently
- Analytics setup can run parallel to feature development

## Key Assumptions
- User has Firebase account or willing to create one
- Exercise content will be manually curated (not AI-generated)
- Moderation will be manual initially (can automate later)
- Subscription pricing decided separately
- Legal documents (privacy policy, ToS) prepared externally

## Trade-offs & Alternatives
- **React Native vs Flutter**: RN chosen for wider community, easier web extension
- **Firebase vs Custom Backend**: Firebase for faster development, managed infrastructure
- **RevenueCat vs Stripe**: RevenueCat specialized for mobile subscriptions
- **Self-hosted vs Cloud**: Cloud Functions for scalability without DevOps overhead
