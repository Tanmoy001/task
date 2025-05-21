from fastapi import FastAPI, Body, Request
import logging
from fastapi.middleware.cors import CORSMiddleware
from langchain.prompts import PromptTemplate
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
import re

app = FastAPI()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# CORS: allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# LangChain + Groq setup
llm = ChatGroq(
    temperature=0,
    groq_api_key="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",
    model_name="deepseek-r1-distill-llama-70b"
)

def get_prompt_for_document(url):
    
    return "Briefly provide a concise summary of the content at this URL: {url}."

def clean_text(text):
    text = re.sub(r'\*\*(.*?)\*\*', r'\1', text)
    text = re.sub(r'\n+', '\n', text).strip()
    text = re.sub(r'</?think>', '', text)
    return text

def extract_data_with_llm(url):
    try:
        prompt_text = get_prompt_for_document(url)
        prompt = PromptTemplate(
            input_variables=["url"],
            template=prompt_text
        )
        chain = prompt | llm | StrOutputParser()
        response = chain.invoke({"url": url})
        return clean_text(response)
    except Exception as e:
        logger.error(f"LLM Error: {str(e)}")
        return f"Error generating summary: {str(e)}"

# ✅ Final simplified route
@app.post("/process")
async def process_url(url: str = Body(..., media_type="text/plain")):
    logger.info(f"Received request for URL: {url}")
    try:
        summary = extract_data_with_llm(url)
        return {
            "url": url,
            "summary": summary,
            "status": "success"
        }
    except Exception as e:
        logger.error(f"Processing failed: {str(e)}")
        return {
            "error": str(e),
            "status": "error"
        }
