# Redesign of Skip Selection Page

## Introduction

This README explains how I redesigned the skip selection page on [wewantwaste.co.uk](https://wewantwaste.co.uk).

---

## 1. Reviewing the Existing Page

1. I opened the skip selection page.
2. I noted what worked and what could be improved.

---

## 2. Taking Notes on Improvements

While reviewing, I wrote down points such as:

- No dark/light theme toggle.
- Cards lacked clear data placement.
- Progress bar could be clearer.

---

## 3. Redesigning in Figma

1. Created a Figma file to sketch updated versions.
2. Designed:

   - Cards with better placement of size, price, and duration.
   - A toggle for light and dark themes.
   - An improved progress bar that shows completed, current, and upcoming steps.

3. Shared the Figma link below.

**Figma Link:**

> [Figma Link](https://www.figma.com/design/x25H7NDQ3ZKkd4INzxplQi/wewantwaste-redesign?m=auto&t=iSgMiC9GAtiq4CFa-1)

---

## 4. Main Changes Implemented

### 4.1 Light / Dark Theme Toggle

- Added a toggle button in the header.
- Switches page colors, including card backgrounds, modal, and progress bar.

### 4.2 Improved Card Design

- Cards now have consistent padding and margins.
- Price highlighted in blue.
- Hire duration shown below the title.
- Badges for “⚠ Not allowed on road” and “🚫 Not for heavy waste.”
- Hover effect: cards scale up slightly.
- Disabled cards (both flags true) are partly transparent and not clickable.

### 4.3 Confirmation Modal

- Opens when a user clicks a card.
- Badges for restrictions.
- Title displays “4 Yard Skip • £211.”
- Buttons match card colors and adapt to light/dark theme.
- Clicking outside or “Close” closes the modal.

### 4.4 Improved Progress Bar

- Completed steps: green segments and text.
- Current step: blue segment and text.
- Upcoming steps: gray (light/dark).
- On mobile, it becomes a vertical timeline with colored fill.

---

## 5. Responsive Layout

- **Desktop (MD+):** Horizontal progress bar, cards in 1–3 columns, centered modal.
- **Mobile (\<MD):** Vertical progress bar, cards stacked in one column, centered modal.

---

## 6. Technologies & Tools Used

- **Tailwind CSS** (with `dark:` classes)
- **Next.js** (React)
- **Figma** for UI design
- **React Icons** for step icons
- **Next.js `<Image>`** for images
- **React state/hooks** for theme toggle, modal, and step index

---

## 7. How to Run Locally

1. **Clone the repo**

   ```bash
   git clone https://github.com/Sheddiey/remwaste.git
   cd remwaste
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start dev server**

   ```bash
   npm run dev
   ```

4. **Open**
   Visit `http://localhost:3000` to see the redesign.

---

## 8. Conclusion

This redesign adds a theme toggle, clearer cards, a confirmation modal, and an improved progress bar for better user experience on both desktop and mobile. I have also added two buttons at the bottom of the page to show how the progress bar changes during different steps.
