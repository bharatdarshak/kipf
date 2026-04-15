# Route Map: KIPF Redesign

This document outlines the URL structures, active paths, and layout associations for all planned pages of the KIPF directory to ensure clean navigation scaling.

## Core Hierarchy & Top-Level Routes

Built utilizing Next.js App Router parameters.

| Route / Path | Feature / Page Intent | Component Focus |
| --- | --- | --- |
| `/` | **Home** - Mobile-first overview, hero, quick actions, highlights | `app/page.tsx` |
| `/book` | **Booking Hub** - Landing page for all booking functions | `app/book/page.tsx` |
| `/participate` | **Participation Hub** - Landing page for exhibition entries | `app/participate/page.tsx` |
| `/more` | **More / Discover** - Additional information indexing | `app/more/page.tsx` |
| `/contact` | **Contact / Support** - Address, reach out forms, policies | `app/contact/page.tsx` |

## Sub-Routes Mapping

### Booking (`/book`)
- `/book/stall` -> Stall Booking conversion flow
- `/book/registration` -> User Registration (delegate) Flow
- `/book/registration-details` -> Lookup Flow for registered users

### Participation (`/participate`)
- `/participate/stall` -> By Stall / Pavilion information and commercial layout
- `/participate/souvenirs` -> By Souvenirs options
- `/participate/sponsorship` -> By Sponsorship packages

### More (`/more`)
- `/more/fair` -> The Fair (Overview & History)
- `/more/programs` -> Technical Seminars, Programs Data
- `/more/facilities` -> Venue Facilities
- `/more/prelude` -> Introduction/Prelude
- `/more/organizers` -> Organizing Committee & Organized By
- `/more/archive` -> Exhibitor Archive pages

### Contact / Admin (`/contact`)
- `/contact/us` -> Main Contact Details (Phone, Address info.kipf@yahoo.com)
- `/contact/about` -> About Us 
- `/contact/pricing` -> Services Pricing
- `/contact/privacy` -> Privacy Policy
- `/contact/terms` -> Terms & Conditions
- `/contact/refund` -> Refund / Cancellation Policy
- `/admin` -> Admin Portal Login

## Rules for Future Extensions
If a new static or CMS-driven page is added, place it under the most logical sub-route category instead of flooding the root `/`. Maintain at least the BottomNav and TopBar on all root layout elements. 

### Data Requirements
Data should be structured in `/src/utils/data.ts` to populate repeated cards rather than hard-coding. SEO specific metadata should be exported from each `page.tsx` module.
