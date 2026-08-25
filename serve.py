#!/usr/bin/env python3
"""Dev server with Cache-Control: no-store.

Browsers cache ES modules aggressively; during development you want every
reload to fetch fresh files. Usage:  python3 serve.py [port]  (default 8137)
"""
import sys
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()
    def log_message(self, *a):  # silence per-request noise
        pass


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8137
    srv = ThreadingHTTPServer(("0.0.0.0", port), partial(NoCacheHandler, directory="."))
    print(f"FORGE dev server → http://127.0.0.1:{port} (no-store)")
    srv.serve_forever()
