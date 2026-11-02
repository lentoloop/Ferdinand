from pathlib import Path
from PIL import Image, ImageDraw
import json
shots=Path('tests/e2e/artifacts/fd2')
reference=Path('/workspace/design/ferdinand/r3/shots')
count=0
for shot in shots.glob('*.png'):
    if shot.name.startswith('compare--'):
        continue
    ref=reference/shot.name
    if not ref.exists():
        continue
    a=Image.open(ref).convert('RGB');b=Image.open(shot).convert('RGB')
    a=a.resize((b.width,round(a.height*b.width/a.width)))
    canvas=Image.new('RGB',(a.width+b.width,max(a.height,b.height)+28),'white')
    ImageDraw.Draw(canvas).text((8,8),'Approved reference (left) / Svelte (right)',fill='black')
    canvas.paste(a,(0,28));canvas.paste(b,(a.width,28));canvas.save(shots/('compare--'+shot.name));count+=1
print(f'{count} comparisons written')
