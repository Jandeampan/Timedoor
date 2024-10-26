FROM python:3.9-slim-bullseye

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt && rm requirements.txt

EXPOSE 5000

ENV PYTHONUNBUFFERED=1

RUN useradd -m appuser
USER appuser

CMD ["python", "-u", "main.py"]
