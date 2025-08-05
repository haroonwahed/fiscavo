# Fiscavo - Dutch Tax Management Platform

## Overview
Fiscavo is a comprehensive web application designed to provide tax advice and management tools for Dutch freelancers (ZZP'ers) and small business owners (BV owners). The platform aims to deliver simple, secure, and accurate tax solutions, helping users save time, reduce stress, and effectively manage their tax obligations. It provides interactive tools for BTW (VAT) management, transaction categorization, expense deductions, and income tax calculations, along with AI-powered assistance for personalized advice and task management. The business vision is to become the leading digital tax assistant in the Netherlands, simplifying complex tax regulations for entrepreneurs and maximizing their financial efficiency.

## User Preferences
- Language: Dutch (primary interface language)
- Target Users: Non-technical entrepreneurs (ZZP'ers and BV owners)
- Communication Style: Friendly but professional, clear and concise
- Focus: Practical tax advice without overwhelming technical details

## System Architecture
Fiscavo is built with a modern web application architecture, focusing on a responsive and intuitive user experience.

### Recent Critical Fixes (January 2025)
- **Authentication System**: Fixed critical "body stream already read" error in queryClient.ts that was preventing login/registration
- **Error Handling**: Improved frontend error handling to prevent double body reading in fetch responses
- **Session Management**: Verified complete authentication flow: registration → login → logout working seamlessly
- **API Endpoints**: All core tax functionality endpoints operational and tested

### UI/UX Decisions
The design is inspired by platforms like Stripe, Notion, and Taxfix, prioritizing a clean, minimal, and professional aesthetic.
- **Color Palette**: Primarily blue (#2563EB) with refined neutrals, using a consistent blue theme (#2563EB, #1D4ED8) for branding.
- **Typography**: Plus Jakarta Sans for a modern and professional appearance.
- **Components**: Rounded corners, premium shadows, and hover effects are applied to cards and interactive elements.
- **Design Elements**: Gradient backgrounds, floating elements in the hero section, and smooth animations/transitions enhance user experience.
- **Branding**: Prominent Fiscavo logo visibility with a professional design and "Simpel | Veilig | Accuraat" positioning.

### Technical Implementations
- **Frontend**: React + TypeScript + Vite, utilizing Tailwind CSS and shadcn/ui components for a modular and consistent design system. Wouter is used for client-side routing and TanStack Query for state management.
- **Backend**: Express.js + TypeScript, providing a robust API layer for data processing and business logic.
- **Authentication**: Secure user authentication is implemented using Replit's OpenID Connect (OAuth) system, with session management stored in the database.
- **Security**: Comprehensive HTTPS enforcement, security headers (HSTS, CSP), and secure cookie handling are configured for production readiness.
- **Email Functionality**: Integrated @sendgrid/mail for email notifications.

### Feature Specifications
Fiscavo provides a suite of tools accessible as individual pages:
- **Interactive Chat Assistant**: AI-powered tax advice in Dutch.
- **Transaction Management**: Bank integration (ING, ABN AMRO, Rabobank), bulk categorization using AI (Claude 4.0 Sonnet), and VAT extraction from receipts.
- **BTW Return Generator**: Automated quarterly BTW calculations and generation.
- **Mileage Tracking**: GPS-based business travel deduction with official Dutch rates (€0.23/km).
- **Tax Calculator**: Real-time income tax and social contribution calculations based on Dutch tax brackets.
- **Receipt Management**: OCR processing with confidence scoring, automatic data extraction, and Dutch tax compliance validation.
- **Deadline Management**: Tracks upcoming tax obligations with urgency indicators.
- **Deduction Checker**: Helps identify eligible business expense deductions.
- **Todo Generator**: Creates personalized tax compliance checklists.
- **FAQ System**: Comprehensive answers to common tax questions.
- **Analytics Dashboard**: Personalized insights with real-time savings tracking and compliance scoring.
- **Onboarding Flow**: Interactive guided tour for new users.
- **Legal Framework**: Comprehensive Privacy Policy (GDPR compliant), Terms of Service, Cookie Policy, GDPR Rights page, and Security Policy (ISO 27001 considerations).

### System Design Choices
- **Database**: PostgreSQL with Drizzle ORM for persistent data storage, replacing prior in-memory solutions.
- **API Endpoints**: Structured API endpoints for chat, deadlines, deductions, FAQ, todo lists, and intelligent tax advice generation.
- **Data Persistence**: All tax-related data (transactions, BTW returns, mileage, calculations) and user-specific information are stored and personalized through an authenticated user system.
- **Modularity**: Core features are built as individual accessible pages with dedicated routing, allowing for direct access and logical separation.

## External Dependencies
- **Database**: PostgreSQL
- **ORM**: Drizzle ORM
- **AI/ML**: Anthropic API (Claude 4.0 Sonnet) for advanced AI features (expense categorization, tax advice, receipt analysis).
- **Email Service**: SendGrid (via @sendgrid/mail package).
- **Authentication**: Replit's OpenID Connect (OAuth).
- **Bank Integrations**: Framework for Dutch banks (ING, ABN AMRO, Rabobank).