# StreetARTists Project Specification

## Overview

StreetARTists is a web platform designed exclusively for mobile devices, aimed at empowering street artists by providing a space to track income and showcase their masterpieces. This solution helps artists move away from traditional, manual tracking methods towards a more organized, digital management of their finances and art exposure.

### Project Goal

The goal is to offer street artists a comprehensive web space for tracking income and a professional platform to display their art, thereby solving the dual problem of financial management and effective online presence.

### Problem Statement

Many artists still rely on outdated methods for tracking expenses and income, lacking insights into their financial performance. Additionally, their reliance on social media for online presence often appears unprofessional. StreetARTists addresses these issues by offering a digital income tracking tool and a professional platform for artists to showcase their work.

### Vision

To leverage modern technology in helping young artists express themselves and achieve global reach.

## Pages

- **Landing Page:** `index.html`
- **Artists Home Page:** `index.html#artists`
- **Artists Items:** `index.html#artists/items`
- **Live Auction:** `index.html#auction`
- **Visitor Home Page:** `index.html#visitor`
- **Visitor Listing:** `index.html#visitor/listing`

Additional pages can be added or existing ones modified as needed.

## Resources

- **Icons:** Font-Awesome
- **Charting:** Chartjs (https://www.chartjs.org/docs/latest/getting-started/)
- **Users (Artists):** https://jsonplaceholder.typicode.com/users
- **Fonts:** Reenie Beanie and Roboto from Google Fonts
- **Design Mockups:** Available on Figma

## Technology Stack

- **Frontend:** HTML, CSS, Bootstrap, JavaScript
- **Charting Library:** Chart.js for data visualization
- **Fonts:** Google Fonts for typography

## Features

### Landing Page

Options for joining as an artist or visitor, with artist selection from a dropdown menu populated via API.

### Visitor Home Page

Features a header with logo and auction icon, a banner with a call-to-action button, animated image sliders, and a custom-designed carousel.

### Visitor Listing Page

Displays items available from different artists with filters for item name, artist, price, and type. Includes a unique card design for listing items.

### Artist Home Page

Displays current sales status, total income, live auction items, and a chart showing sales over selected periods.

### Artist Menu

A dropdown menu with options leading to different sections: Home, Items, Auction.

### Artist Items Page

Shows all items from the logged-in artist with options to send items to auction, publish/unpublish, remove, or edit items.

### Artist New/Edit Item Page

Facilitates adding new items or editing existing ones with fields for images, title, description, type, price, and auction status.

### Artist Capture Image Popup

A mobile-specific feature for capturing item images directly from the device.

### Auctioning

A live auction page where only visitors can bid on items, with a simulated auction environment, including a countdown timer and bid management.

## Mobile-Only Design

This project is optimized for mobile devices, utilizing HTML, CSS, Bootstrap, and JavaScript to ensure a responsive and user-friendly experience on smartphones and tablets.

