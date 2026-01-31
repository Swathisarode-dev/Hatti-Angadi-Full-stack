# Backend - Hatti Angadi API

## Tech Stack
- **Framework**: Django + Django REST Framework (DRF)
- **Database**: PostgreSQL
- **Authentication**: None (Guest checkout only, maybe SimpleJWT for admin if needed later, but prompt says No Admin UI).

## Planned Models

### 1. Menu
- **Category**: `name` (e.g., Starters, Main Course, Breads), `image`.
- **MenuItem**: `name`, `description`, `price`, `is_spicy`, `image`, `category` (FK), `is_available`.

### 2. Interactions
- **Review**: `customer_name`, `rating` (1-5), `comment`, `created_at`.
- **Inquiry/Order**: `customer_name`, `phone`, `items` (JSON or M2M), `total_amount`, `status` (Pending/Received).
  - *Note*: This is "Selection Only", so we store the inquiry, we don't process payment.

### 3. Core
- **ContactMessage**: `name`, `email`, `subject`, `message`.

## Setup Instructions
1. `python -m venv venv`
2. `source venv/Scripts/activate`
3. `pip install django djangorestframework psycopg2`
4. `django-admin startproject config .`
