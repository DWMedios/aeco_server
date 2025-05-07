-- Script para crear extensiones PostgreSQL útiles
CREATE EXTENSION IF NOT EXISTS unaccent;
CREATE EXTENSION IF NOT EXISTS pg_trgm;    -- Búsquedas de texto similares
CREATE EXTENSION IF NOT EXISTS citext;     -- Texto insensible a mayúsculas/minúsculas
CREATE EXTENSION IF NOT EXISTS uuid-ossp;  -- Generación de UUIDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;   -- Funciones criptográficas
CREATE EXTENSION IF NOT EXISTS btree_gist; -- Mejor soporte para índices con rangos (útil para fechas)

-- Configuración para optimizar funciones de fecha y texto
ALTER SYSTEM SET standard_conforming_strings = on;

-- Comentarios sobre funciones nativas usadas en la aplicación:
-- to_char - Función nativa para formatear fechas y números como texto
-- generate_series - Función nativa para generar secuencias de valores
-- date_trunc - Función nativa para truncar fechas a la precisión especificada
-- CAST - Función nativa para conversión de tipos
-- LOWER, UPPER, BTRIM - Funciones nativas para manipulación de texto