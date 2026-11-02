from pathlib import Path
from PIL import Image, ImageDraw
import os
shots = Path(os.environ.get('YN3_SHOTS', 'tests/e2e/artifacts/yn3-ui'))
reference = Path('/workspace/design/ferdinand/import/shots')
for width in (390, 1440):
    for state in ('preview','all-new','errors','over-limit','loading','importing','done'):
        name = f'import--{state}--{width}.png'
        a = Image.open(reference/name).convert('RGB')
        a = a.resize((width, round(a.height*width/a.width)))
        b = Image.open(shots/name).convert('RGB')
        canvas = Image.new('RGB', (width*2, max(a.height,b.height)+28), 'white')
        ImageDraw.Draw(canvas).text((8,8), 'Approved reference (left) / Svelte (right)', fill='black')
        canvas.paste(a,(0,28)); canvas.paste(b,(width,28))
        canvas.save(shots/f'compare--{state}--{width}.png')
print('14 side-by-side comparisons written')
