from pathlib import Path
import environ

BASE_DIR = Path(__file__).resolve().parent
env = environ.Env()
env.read_env(BASE_DIR / ".env")

print(env("POSTGRES_USER"))
print(env("SUPERUSER_PASSWORD"))
print(env("DEBUG"))
