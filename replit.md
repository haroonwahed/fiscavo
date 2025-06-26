# Fiscatax - Dutch Tax Management Platform

## Project Overview
A comprehensive web application providing tax advice and management tools for Dutch freelancers and small business owners. The platform delivers simple, secure, and accurate tax solutions to help users save time, reduce stress, and manage their tax obligations effectively.

## Recent Changes
- **2024-12-26**: Completed Fiscatax rebranding and content enhancement
  - Updated application name from "BelastingAssistent" to "Fiscatax"
  - Added new positioning: "Simpel | Veilig | Accuraat"
  - Enhanced FAQ section with comprehensive Dutch tax questions (15 total)
  - Added application-specific support questions covering all features
  - Updated footer with professional contact information and compliance details
  - Improved welcome messages and brand consistency throughout

- **2024-12-26**: Implemented comprehensive tax management platform
  - Added transaction management with bank account integration
  - Built automated BTW return generator with quarterly calculations
  - Implemented mileage tracking with €0.23/km Dutch rate
  - Created real-time tax calculator with Dutch tax brackets
  - Added receipt management and expense categorization
  - All features integrated with PostgreSQL for persistent storage

- **2024-12-25**: Added PostgreSQL database with Drizzle ORM
  - Migrated from in-memory storage to persistent database
  - Created database tables for all entities
  - Implemented automatic data seeding on startup
  - All tax deadlines, deduction rules, and FAQ items now stored in database

## Project Architecture

### Tech Stack
- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Styling**: Tailwind CSS + shadcn/ui components
- **Routing**: Wouter (frontend)
- **State Management**: TanStack Query

### Core Features
1. **Interactive Chat Assistant**: AI-powered tax advice in Dutch
2. **Transaction Management**: Bank integration, categorization, BTW tracking
3. **BTW Return Generator**: Automated quarterly BTW calculations and filing
4. **Mileage Tracking**: GPS-based business travel deduction (€0.23/km)
5. **Tax Calculator**: Real-time income tax and social contribution calculations
6. **Receipt Management**: OCR processing and automatic categorization
7. **Deadline Management**: Tracks upcoming tax obligations with urgency indicators
8. **Deduction Checker**: Helps identify eligible business expense deductions
9. **Todo Generator**: Creates personalized tax compliance checklists
10. **FAQ System**: Comprehensive answers to common tax questions

### Database Schema
- `chat_messages`: User conversations and responses
- `tax_deadlines`: Important tax filing deadlines
- `deduction_rules`: Business expense deduction guidelines
- `faq_items`: Frequently asked questions and answers
- `todo_lists`: Generated task lists for tax compliance
- `user_profiles`: User business type and preferences

### API Endpoints
- `/api/chat/messages` - Chat functionality
- `/api/deadlines` - Tax deadline management
- `/api/deductions` - Deduction rule queries
- `/api/faq` - FAQ content
- `/api/todo-lists` - Task list generation
- `/api/tax-advice` - Intelligent tax advice generation

## User Preferences
- Language: Dutch (primary interface language)
- Target Users: Non-technical entrepreneurs (ZZP'ers and BV owners)
- Communication Style: Friendly but professional, clear and concise
- Focus: Practical tax advice without overwhelming technical details

## Current Status
✓ Database integration completed
✓ Core features implemented and functional
✓ Responsive design with mobile support
✓ Real-time data persistence
→ Ready for additional feature development