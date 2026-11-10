# Shop Inventory in 3D: Voice Walkthrough Master Script

An educational audio walkthrough for the 3D interactive visualization of dictionary immutability in [`13-shop-inventory/Shop inventory in 3D, step by step.html`](../../13-shop-inventory/Shop%20inventory%20in%203D%2C%20step%20by%20step.html).

This script follows the primary built-in preset:
- Function call: `restock(stock, "gari", 8)`
- Original stock: `{"rice": 10, "beans": 5}`
- Verified Result: Returns a new dictionary `{"rice": 10, "beans": 5, "gari": 8}` with the original stock remaining completely unchanged.

All narration clips are written for curious beginners, linking the highlighted Python code to the visual changes in the 3D scene (locked back shelf, front copy shelf, gold transfer beam, and immutability proof badge) without reciting raw syntax. The spoken text is formatted specifically for ElevenLabs text-to-speech generation.

---

## 1. Verified Outline and Ground Truth

### Input and Shelf Layout
- **Original stock (Back shelf)**: `{"rice": 10, "beans": 5}`
  - Shelf is color-coded with locked status and red/grey bins.
  - Invariant: It must never be mutated under any circumstance.
- **New stock (Front shelf)**: Created empty at line one (`new_stock = {}`).
  - Items are copied over one by one via a gold transfer beam.
  - Newly restocked or sold items are modified strictly on this front shelf.
- **Target Restock Operation**: `item = "gari"`, `qty = 8`.
- **Expected Outcome**: New bin created with 8 crates of gari on the front shelf; original back shelf still holds 10 rice and 5 beans.

---

### Python Source Code (restock snippet)

```python
 1: def restock(stock, item, qty):
 2:     new_stock = {}
 3:     for name in stock:
 4:         new_stock[name] = stock[name]
 5:     if type(qty) is int and qty > 0:
 6:         if item in new_stock:
 7:             new_stock[item] = new_stock[item] + qty
 8:         else:
 9:             new_stock[item] = qty
10:     return new_stock
```

---

### Verified Simulation Trace (8 Frames)

| Frame | Active Lines | Action | State / 3D Visual Changes | Hold |
|:---:|:---:|:---|:---|:---:|
| **0** | None | Start | Key idea: back shelf locked, front shelf ready. | 1.5 |
| **1** | Line 1 | Initialize | `new_stock = {}` starts as an empty dictionary. | 1.1 |
| **2** | Lines 2, 3 | Copy Rice | Gold transfer beam copies 10 rice to front shelf. | 1.0 |
| **3** | Lines 2, 3 | Copy Beans | Gold transfer beam copies 5 beans to front shelf. | 1.0 |
| **4** | Line 4 | Validate Quantity | `type(8) is int and 8 > 0` evaluates to True. | 1.1 |
| **5** | Line 5 | Membership Check | Is `"gari"` in `new_stock`? False, it is a new item. | 1.1 |
| **6** | Lines 7, 8 | Add New Item | New bin with 8 crates of gari drops onto front shelf. | 1.3 |
| **7** | Line 9 | Return & Verify | Return `new_stock`; green proof badge verifies original stock unchanged. | 1.8 |

---

## 2. Audio Segment Table

| Filename | Milestone / Title | Animation Cues | Code Lines | Spoken Text | Chars | Approx Duration |
|:---|:---|:---:|:---|:---|:---:|:---:|
| `01-setup-and-immutability.mp3` | **Setup and Immutability Principle** | Frame 0 (t=0.0s), Frame 1 (t=14.0s) | Line 1 | Welcome to Shop Inventory in 3D. When writing reliable software, a core engineering rule is immutability: never accidentally mutate stock that other parts of your program depend on. In our 3D shop, the back shelf holds the original stock, containing ten bags of rice and five bags of beans. This back shelf is locked. To restock eight units of a new item, gari, we begin at line one by creating new stock as a fresh, empty dictionary on our front shelf. | 473 chars | ~23s |
| `02-copying-existing-stock.mp3` | **Copying Existing Stock** | Frame 2 (t=0.0s), Frame 3 (t=7.5s) | Lines 2, 3 | Before adding any new items, we must preserve what we already have. Lines two and three run a loop over every item in the original stock. First, a gold transfer beam copies our ten units of rice onto the front shelf. Next, the beam copies our five units of beans. Notice that the back shelf is completely untouched: the original dictionary still holds ten rice and five beans. | 379 chars | ~18s |
| `03-validation-and-item-check.mp3` | **Quantity Validation and Membership Check** | Frame 4 (t=0.0s), Frame 5 (t=7.0s) | Lines 4, 5 | Now we process the incoming shipment. At line four, defensive programming checks that our quantity, eight, is a positive whole number. It is. At line five, we check if gari already exists in our new stock. It does not, so the algorithm skips down to our else branch at line seven. | 283 chars | ~14s |
| `04-restocking-new-item.mp3` | **Restocking the New Item** | Frame 6 (t=0.0s) | Lines 7, 8 | At line eight, we assign new stock of gari to equal eight. A brand new bin drops onto our front shelf, stacked with eight crates of gari. Only the new shelf is modified, leaving the original stock at the back completely unchanged. | 231 chars | ~11s |
| `05-return-and-immutability-proof.mp3` | **Safe Return and Immutability Proof** | Frame 7 (t=0.0s) | Line 9 | Finally, at line nine, the function returns our newly constructed dictionary with three items: rice, beans, and gari. Look at the green proof badge in the center: our original stock at the back still holds its original two items without a single change. The restock operation is complete and fully verified. | 313 chars | ~16s |

---

## 3. Continuous Read-Through

> Welcome to Shop Inventory in 3D. When writing reliable software, a core engineering rule is immutability: never accidentally mutate stock that other parts of your program depend on. In our 3D shop, the back shelf holds the original stock, containing ten bags of rice and five bags of beans. This back shelf is locked. To restock eight units of a new item, gari, we begin at line one by creating new stock as a fresh, empty dictionary on our front shelf.
>
> Before adding any new items, we must preserve what we already have. Lines two and three run a loop over every item in the original stock. First, a gold transfer beam copies our ten units of rice onto the front shelf. Next, the beam copies our five units of beans. Notice that the back shelf is completely untouched: the original dictionary still holds ten rice and five beans.
>
> Now we process the incoming shipment. At line four, defensive programming checks that our quantity, eight, is a positive whole number. It is. At line five, we check if gari already exists in our new stock. It does not, so the algorithm skips down to our else branch at line seven.
>
> At line eight, we assign new stock of gari to equal eight. A brand new bin drops onto our front shelf, stacked with eight crates of gari. Only the new shelf is modified, leaving the original stock at the back completely unchanged.
>
> Finally, at line nine, the function returns our newly constructed dictionary with three items: rice, beans, and gari. Look at the green proof badge in the center: our original stock at the back still holds its original two items without a single change. The restock operation is complete and fully verified.

---

## 4. Pronunciation and Text-to-Speech Notes

1. **Numbers as Words**:
   - Numbers are written as words: `"ten"`, `"five"`, `"eight"`, `"three"`, `"two"`.
2. **Item Names**:
   - `"gari"` is pronounced phonetically as `"gah-ree"`.
   - `"rice"` and `"beans"` are pronounced naturally.
3. **Pacing and Cues**:
   - Natural commas and periods allow visual transitions (gold beam, bin drop, green proof badge) to execute seamlessly in time with narration.

---

## 5. ElevenLabs Production Summary

- **Total Clips**: 5 clips
- **Total Character Count**: 1,679 characters
- **Estimated ElevenLabs Credit Usage**: ~1,679 credits (Eleven Multilingual v2)
- **Voice**: `Lauren - Friendly, Comforting and Soft` (ID: `DODLEQrClDo8wCz460ld`)
- **Model**: `eleven_multilingual_v2`
