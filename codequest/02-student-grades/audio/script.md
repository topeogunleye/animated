# Narration Script: Student Grades
Target Visualizer: `codequest/02-student-grades/student_grades_3d.html`  
Target Preset: Preset 0 (Roster of 4 students: Sam, David, Elena, Alex)  
Voice: Lauren (Friendly, Comforting and Soft)  
Model: `eleven_multilingual_v2`

### Segment Table

| Clip ID | Filename | Animation Cue / Frame | Code Lines | Spoken Text | Approx Duration |
|:---|:---|:---|:---|:---|:---|
| clip_01 | `clip_01_setup.mp3` | Frame 0 | 13, 16 | We receive a roster of four student records, each with a list of exam scores. Our pipeline will compute each student average, assign letter grades, filter passing candidates, and discover the highest and lowest performers. | 13s |
| clip_02 | `clip_02_computing_averages.mp3` | Frame 1 | 0-7, 15 | For each student, our helper function sums up their test scores and divides by the score count. For example, Sam earns an average of eighty-five points, which qualifies for a grade A above the seventy point threshold. | 13s |
| clip_03 | `clip_03_filter_passing.mp3` | Frame 9 | 17 | Next, we filter the roster using our passing criterion. Any student earning an A, B, or C with an average of fifty points or higher passes. Sam, David, and Elena move forward, while Alex falls below the passing mark with a grade of E. | 14s |
| clip_04 | `clip_04_track_extremes.mp3` | Frame 13 | 18-21 | We then scan through the graded roster to identify our performance boundaries. We initialize our trackers with Sam, update our top performer crown when Elena hits ninety-three point five, and note Alex as the lowest score. | 13s |
| clip_05 | `clip_05_summary.mp3` | Frame 17 | 16-17 | The functional grading pipeline is complete. Three out of four students passed successfully, with Elena taking top honors with a stellar ninety-three point five average. | 10s |

### Pronunciation & Formatting Notes
- "A, B, or C": Spoken clearly as letters.
- "ninety-three point five": Spelled out phonetically without decimals.
