import subprocess
import sys
import textwrap

PRINTER_NAME = "9printer-80mpt"
CHARS_PER_LINE = 42  # adjust after testing

TEMPLATES = {
    "childhood-memory": {
        "title": "Childhood Memory",
        "body": (
            "Ask someone older in your family:\n\n"
            "What game or activity did you love most when you were young?"
        ),
        "footer": "Keep this receipt and take the question home."
    },
    "family-conflict": {
        "title": "Family Tension",
        "body": (
            "Ask someone older in your family:\n\n"
            "What was something you were not allowed to say openly when you were younger?"
        ),
        "footer": "Take this question into a conversation."
    },
    "migration-story": {
        "title": "Movement",
        "body": (
            "Ask someone older in your family:\n\n"
            "What place do you remember leaving behind most clearly?"
        ),
        "footer": "A memory can travel too."
    },
    "traditional-recipe": {
        "title": "Family Recipe",
        "body": (
            "Ask someone older in your family:\n\n"
            "What food is popular to our family and what's the recipe?"
        ),
        "footer": "Keep this receipt and take the question home."
    },
    "love-story": {
        "title": "Love Story",
        "body": (
            "Ask someone older in your family:\n\n"
            "Can you tell me a love story from someone in the family that you know?"
        ),
        "footer": "A memory can travel too."
    },
    "life-choice": {
        "title": "Life Decision",
        "body": (
            "Ask someone older in your family:\n\n"
            "What is the biggest life decision that you have made and how do you feel about it now?"
        ),
        "footer": "Take this question into a conversation."
    }

}

def escpos_init() -> bytes:
    return b"\x1b@"

def escpos_align_left() -> bytes:
    return b"\x1ba\x00"

def escpos_align_center() -> bytes:
    return b"\x1ba\x01"

def escpos_bold_on() -> bytes:
    return b"\x1bE\x01"

def escpos_bold_off() -> bytes:
    return b"\x1bE\x00"

def escpos_cut() -> bytes:
    return b"\x1dV\x00"

def wrap_text(text: str, width: int) -> str:
    paragraphs = text.split("\n")
    wrapped = []
    for para in paragraphs:
        if not para.strip():
            wrapped.append("")
            continue
        wrapped.extend(
            textwrap.wrap(
                para,
                width=width,
                break_long_words=False,
                break_on_hyphens=False,
            )
        )
    return "\n".join(wrapped)

def make_receipt(title: str, body: str, footer: str = "") -> bytes:
    divider = "-" * CHARS_PER_LINE
    wrapped_body = wrap_text(body, CHARS_PER_LINE)
    wrapped_footer = wrap_text(footer, CHARS_PER_LINE) if footer else ""

    parts = [
        escpos_init(),
        escpos_align_center(),
        escpos_bold_on(),
        (title.upper() + "\n").encode("utf-8"),
        escpos_bold_off(),
        (divider + "\n").encode("utf-8"),
        escpos_align_left(),
        (wrapped_body + "\n").encode("utf-8"),
    ]

    if wrapped_footer:
        parts.extend([
            ("\n" + divider + "\n").encode("utf-8"),
            escpos_align_center(),
            (wrapped_footer + "\n").encode("utf-8"),
        ])

    parts.extend([b"\n\n", escpos_cut()])
    return b"".join(parts)

def send_to_printer(data: bytes):
    subprocess.run(
        ["lp", "-d", PRINTER_NAME, "-o", "raw"],
        input=data,
        check=True
    )

if __name__ == "__main__":
    key = sys.argv[1] if len(sys.argv) > 1 else "childhood-memory"

    if key not in TEMPLATES:
        print(f"Unknown template key: {key}")
        sys.exit(1)

    tpl = TEMPLATES[key]
    receipt = make_receipt(tpl["title"], tpl["body"], tpl["footer"])
    send_to_printer(receipt)
    print(f"Printed template: {key}")
