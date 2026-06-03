"""
Gemini AI Service - Thin wrapper around Google Generative AI
Requires GEMINI_API_KEY in environment variables
"""
import os
from typing import List, Dict


def _have_gemini() -> bool:
    return bool(os.getenv("GEMINI_API_KEY"))


def generate_text(prompt: str, system: str = "") -> str:
    """Generate text using Gemini API"""
    if _have_gemini():
        try:
            import google.generativeai as genai
            genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
            model = genai.GenerativeModel("gemini-1.5-flash")
            
            full_prompt = f"{system}\n\n{prompt}" if system else prompt
            response = model.generate_content(full_prompt)
            
            return (response.text or "").strip()
        except Exception as e:
            return f"[Gemini API Error] {str(e)}"

    # Deterministic mock so the API still works in dev.
    return (
        f"(mock response - no Gemini API key configured)\n"
        f"Prompt received ({len(prompt)} chars). "
        f"Set GEMINI_API_KEY in .env to enable real responses."
    )


def chat(messages: List[Dict[str, str]], system: str = "") -> str:
    """
    Chat interface with message history.
    messages: [{role: 'user'|'assistant', content: '...'}]
    """
    try:
        import google.generativeai as genai
        
        if not _have_gemini():
            return (
                f"(mock response - no Gemini API key configured)\n"
                f"Messages received ({len(messages)} messages). "
                f"Set GEMINI_API_KEY in .env to enable real responses."
            )
        
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel(
            "gemini-1.5-flash",
            system_instruction=system if system else None
        )
        
        # Convert messages to Gemini format
        chat_history = []
        for msg in messages:
            chat_history.append({
                "role": "user" if msg["role"] == "user" else "model",
                "parts": [msg["content"]]
            })
        
        # Get response from the last user message
        response = model.generate_content(
            [msg["parts"][0] for msg in chat_history]
        )
        
        return (response.text or "").strip()
        
    except Exception as e:
        return f"[Gemini Chat Error] {str(e)}"
