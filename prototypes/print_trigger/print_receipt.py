import subprocess
import sys
import textwrap

PRINTER_NAME = "9printer-80mpt"
CHARS_PER_LINE = 42  # adjust after testing
SHARE_URL = "https://forms.gle/ZuFKTD1WGh14eW62A"  # <-- replace with your real link

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

def escpos_qr(data: str, module_size: int = 4, error_level: str = "M") -> bytes:
    """
    Generate ESC/POS QR code commands.
    module_size: 1-16, 4 is a good small readable size for receipts.
    error_level: L, M, Q, H
    """
    if not (1 <= module_size <= 16):
        module_size = 4

    error_map = {
        "L": 48,  # 7%
        "M": 49,  # 15%
        "Q": 50,  # 25%
        "H": 51,  # 30%
    }
    ec = error_map.get(error_level.upper(), 49)

    data_bytes = data.encode("utf-8")
    store_len = len(data_bytes) + 3
    pL = store_len % 256
    pH = store_len // 256

    commands = [
        # Select model 2
        b"\x1d(k\x04\x001A2\x00",
        # Set module size
        b"\x1d(k\x03\x001C" + bytes([module_size]),
        # Set error correction
        b"\x1d(k\x03\x001E" + bytes([ec]),
        # Store data
        b"\x1d(k" + bytes([pL, pH]) + b"1P0" + data_bytes,
        # Print QR
        b"\x1d(k\x03\x001Q0",
    ]
    return b"".join(commands)

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
        (wrapped_body + "\n\n").encode("utf-8"),

        # Writing space
        ("\n" * 8).encode("utf-8"),
    ]

    if wrapped_footer:
        parts.extend([
            ("\n" + divider + "\n").encode("utf-8"),
            escpos_align_center(),
            (wrapped_footer + "\n\n").encode("utf-8"),
        ])

    # QR section
    parts.extend([
        ("Scan to share your response\n").encode("utf-8"),
        escpos_align_center(),
        escpos_qr(SHARE_URL, module_size=4, error_level="M"),
        b"\n\n",
        escpos_cut(),
    ])

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