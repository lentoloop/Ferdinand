// Thin library shim so `tests/` integration tests can import crate types.
// The binary entry-point stays in main.rs; this file re-exports only the
// subset that tests need.

mod admin;
pub mod auth;
mod bootstrap;
mod error;
mod routes;
pub mod seed_notetypes;
pub mod state;
mod static_assets;

// Integration tests use the same route registration as the server.
pub use routes::router as api_router;
