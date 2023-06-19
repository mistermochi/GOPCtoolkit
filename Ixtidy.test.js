// test initialization

const cases = [
{
input:`7/18 RFT normal , LDL 4.2 , FG 5.0 
7/19 RFT N  FG 5.5  Lipid 6.1/1.1/1.7/3.9
7/11/19  Lipid 6.6/1.3/1.7/4.3
3/2020: TG 1.2, TC 4.6, HDL 1.9, LDL 2.3
8/20 A1c 5.3 FG 5.3 RFT N TG  1.0  TC5.9   HDL 2.2  LDL  3.2 
1/2021 ALT 56 TG 1.1 LDL 2.9 
4/2021: LFT N, ALT 30, AFP 7↑ , anti-HCV and HBsAg -ve
6/21 AFP 6
9/2021  LRFT N   FG 5.0 AFP 7↑ TC 6.7 TG 0.7 HDL  2.2 LDL 4.1 
11/21 : FBS 5.0  Cr 96  eGFR (CKD-EPI) 75  TC 5.1 H  HDL 1.9  LDL 2.8  TG 0.9 LFT N AFP 6
USG 9/21:Private A small intrahepatic bile duct stone (0.4cm)of R lobe of liver. Other are normal 
4/2022: TC 3.7  HDL 1.8  LDL 1.6  TG 0.7  ALT 30 [U/L]  ALP 21 L [U/L]
8/2022: FG 5.0  Cr 101  eGFR 70  TC 4.2  HDL 1.8  LDL 2.1  TG 0.8  ALT 35 [U/L]  ALP 20 L [U/L]
1/23 TC 5.1 H  HDL 2.1  LDL 2.5  TG 1.1
`,
output:`1/23 TC 5.1↑ HDL 2.1 LDL 2.5 TG 1.1
8/22 FG 5.0 Cr 101 eGFR 70 TC 4.2 HDL 1.8 LDL 2.1 TG 0.8 ALT 35 ALP 20↓
4/22 TC 3.7 HDL 1.8 LDL 1.6 TG 0.7 ALT 30 ALP 21↓
11/21 FG 5.0 Cr 96 eGFR 75 TC 5.1↑ HDL 1.9 LDL 2.8 TG 0.9 LFT N AFP 6
9/21 LRFT N FG 5.0 AFP 7↑ TC 6.7 TG 0.7 HDL 2.2 LDL 4.1
6/21 AFP 6
4/21 LFT N ALT 30 AFP 7↑ Anti-HCV and HBsAg -ve
1/21 ALT 56 TG 1.1 LDL 2.9
8/20 A1c 5.3 FG 5.3 RFT N TG 1.0 TC5.9 HDL 2.2 LDL 3.2
3/20 TG 1.2 TC 4.6 HDL 1.9 LDL 2.3
11/19 Lipid 6.6/1.3/1.7/4.3
7/19 RFT N FG 5.5 Lipid 6.1/1.1/1.7/3.9
7/18 RFT normal LDL 4.2 FG 5.0


9/21 USG Private A small intrahepatic bile duct stone (0.4cm)of R lobe of liver. Other are normal
`
},
{
input:`4/2020: FG 6.2, A1c 6.0, RFT N, urate 0.506
8/2020: A1c 5.9, FBS 6.0, LDL 1.9, TG 2.4, RFT N, Urate 0.523
11/2020: RFT N, urate 0.503
5/21 OGTT 6.1/12.7 A1c 6.2 Cr 77 eGFR 90 urate 0.298 TC 4.0 TG 1.6 HDL 1.1 LDL 2.2
4/2022: HbA1c 6.0 H  Cr 77  eGFR 89  TC 4.2  HDL 1.4  LDL 2.2  TG 1.2
OGTT 4.9/8.9, urate 0.275
8/2022: TC 4.1  HDL 1.3  LDL 2.1  TG 1.5  ALT 30 [U/L]  ALP 91 [U/L]
1/2023: FG 6.3 H  Cr 80  eGFR 88  TC 4.2  HDL 1.3  LDL 2.1  TG 1.7 H  ALT 36 [U/L]  ALP 88 [U/L]
`,
output:`1/23 FG 6.3↑ Cr 80 eGFR 88 TC 4.2 HDL 1.3 LDL 2.1 TG 1.7↑ ALT 36 ALP 88
8/22 TC 4.1 HDL 1.3 LDL 2.1 TG 1.5 ALT 30 ALP 91
4/22 A1c 6.0↑ Cr 77 eGFR 89 TC 4.2 HDL 1.4 LDL 2.2 TG 1.2
OGTT 4.9/8.9 Urate 0.275
5/21 OGTT 6.1/12.7 A1c 6.2 Cr 77 eGFR 90 Urate 0.298 TC 4.0 TG 1.6 HDL 1.1 LDL 2.2
11/20 RFT N Urate 0.503
8/20 A1c 5.9 FG 6.0 LDL 1.9 TG 2.4 RFT N Urate 0.523
4/20 FG 6.2 A1c 6.0 RFT N Urate 0.506
`
},
{
input:`6/19: CBC n A1c 5.7 FG 5.7 Cr 129 LFT N TC 3.8 TG 1.7 HDL 1.0 LDL 2.1
10/19: Cr 125 LFT n urate 0.41 N TC 3.2 TG 0.8 HDL 1.2 LDL 1.6  
7/20 CBC N LFT N TSH N
8/20 Cr 188
8/20 MSU -ve
9/20 FG 5.9 Cr 170 urate 0.460 TC 3.3 TG 1.0 HDL 1.1 LDL 1.8
4/21 A1c 5.7 K 5.5 Cr 252 (eGFR 21) Urate 0.746 FG 5.4 TG 1.2 LDL 1.9   MSU -ve
5/2021  Hb 13.2 NcNc  ESR 7   Cr 144  LFT N
5/2021 Private USG kidney: Rt kidney is small in size with cortisol thinnning. Renal parachymal disease has to be conidered. A 1.2 cm milk of calcium cyst is seen in mid pole of R kidney. A few cyst measuring up to 1.3 cm are also seen in left kidney. A 0.8 cm calcific focus is projected over upper pole of left kidney, suspicious of renal stone. Correlation with CT urogram would be helpful.
1/22 : FBS 5.1  Cr 158 H  eGFR (CKD-EPI) 37  TC 3.7  HDL 1.2  LDL 2.0  TG 1.2, CBC N, iron profile not def, ferritin 807 , urate 0.565 
5/22 Cr 165 Bili 31 ALP/ ALT N Urate 0.470 ↑ TC 2.8  HDL 1.0 L  LDL 1.4  TG 0.8  AFP N
10/2022: Cr 192 H  eGFR 29  ALT 23 [U/L]  ALP 149 H [U/L], HBV DNA 86
10/22 MSU wbc ++, EMU x 3 - no AFB. ( known ? renal stone, pending urology 11/2023)
`,
output:`10/22 Cr 192↑ eGFR 29 ALT 23 ALP 149↑ HBVDNA 86
5/22 Cr 165 Bili 31 ALP / ALT N Urate 0.470↑ TC 2.8 HDL 1.0↓ LDL 1.4 TG 0.8 AFP N
1/22 FG 5.1 Cr 158↑ eGFR 37 TC 3.7 HDL 1.2 LDL 2.0 TG 1.2 CBC N Fe profile not def Ferritin 807 Urate 0.565
5/21 Hb 13.2 NcNc ESR 7 Cr 144 LFT N
4/21 A1c 5.7 K 5.5 Cr 252 ( eGFR 21) Urate 0.746 FG 5.4 TG 1.2 LDL 1.9 MSU -ve
9/20 FG 5.9 Cr 170 Urate 0.460 TC 3.3 TG 1.0 HDL 1.1 LDL 1.8
8/20 Cr 188
7/20 CBC N LFT N TSH N
10/19 Cr 125 LFT n Urate 0.41 N TC 3.2 TG 0.8 HDL 1.2 LDL 1.6
6/19 CBC n A1c 5.7 FG 5.7 Cr 129 LFT N TC 3.8 TG 1.7 HDL 1.0 LDL 2.1

10/22 MSU WBC ++ EMU x 3 - no AFB. ( known ? renal stone, pending urology 11/2023 )
8/20 MSU -ve

5/21 Private USG kidney: Rt kidney is small in size with Cortisol thinnning. Renal parachymal disease has to be conidered. A 1.2 cm milk of calcium cyst is seen in mid pole of R kidney. A few cyst measuring up to 1.3 cm are also seen in left kidney. A 0.8 cm calcific focus is projected over upper pole of left kidney, suspicious of renal stone. Correlation with CT urogram would be helpful.
`
},
{
input:`10/2021 WBC 3.5 MCV 101.9 MCH 33.4 am cortisol 256 TSH 0.43 ACTH 12.3
12/21 Hb 12.9 plt 158 WBC 3.2 MCV↑ B12/folate N retic N ESR 25 SPE -ve FT4 10.2↓ TSH N RFT N eGFR>90 LFT N CaPO4 N LDH N 

5/22  Hb 12.6(n)   wbc 3.1  Plt 157  FT4 10.7↓  TSH 0.46 (n)  FG 5.6  Lipid 4.7/0.9/1.4/2.9
9/22 T3 7.2↑ WBC 2.7↓  t4 N TSH  < 0.01↓ 
12/2022: Hb N, MCV 98.3, plt 131, WBC 2.6, neut 1.0, Vit B/ folate N ( platelet clumps ) 
`,
output:`12/22 Hb N MCV 98.3 PLT 131 WBC 2.6, neut 1.0, Vit B/ Folate N ( platelet clumps )
9/22 T3 7.2↑ WBC 2.7↓ T4 N TSH < 0.01↓
5/22 Hb 12.6(n) WBC 3.1 PLT 157 T4 10.7↓ TSH 0.46 (n) FG 5.6 Lipid 4.7/0.9/1.4/2.9
12/21 Hb 12.9 PLT 158 WBC 3.2 MCV ↑ B12 / Folate N Retic N ESR 25 SPE -ve T4 10.2↓ TSH N RFT N eGFR >90 LFT N CaPO4 N LDH N
10/21 WBC 3.5 MCV 101.9 MCH 33.4 AM cortisol 256 TSH 0.43 ACTH 12.3
`
},
{
input:`8/2021 LFT N, urate 0.42, HbA1c 7.4 FBS 7.5 Cr 116 eGFR 58  TC 3.5  HDL 1.1  LDL 1.5  TG 2.1 UACR 2.7 
MRMA 12/2021: no DR, RS 36 months
1/2022: A1C 8.5
3/22 HbA1c 7.8 H  FBS 8.6 H  Cr 110 H K 6.1 (Referred AED, check 5.2) eGFR (CKD-EPI) 62 urate 0.339
6/2022: HbA1c 7.1 H  FG 6.5 H  Cr 112 H  eGFR 60  TC 3.5  HDL 0.8 L  LDL 1.9  TG 1.8 H  UACR 1.5  urate 0.48
9/2022: HbA1c 7.0 H  FG 6.8 urate 0.45
1/23 A1c 7.2↑ FG 8.4 uraet 0.453`,
output:`1/23 A1c 7.2↑ FG 8.4 uraet 0.453
9/22 A1c 7.0↑ FG 6.8 Urate 0.45
6/22 A1c 7.1↑ FG 6.5↑ Cr 112↑ eGFR 60 TC 3.5 HDL 0.8↓ LDL 1.9 TG 1.8↑ ACR 1.5 Urate 0.48
3/22 A1c 7.8↑ FG 8.6↑ Cr 110↑ K 6.1 (Referred AED, check 5.2) eGFR 62 Urate 0.339
1/22 A1c 8.5
8/21 LFT N Urate 0.42 A1c 7.4 FG 7.5 Cr 116 eGFR 58 TC 3.5 HDL 1.1 LDL 1.5 TG 2.1 ACR 2.7






12/21 MRMA no DR, RS 36 months
`
},
{
input:`USG 9/2015 → Static small gallbladder polyps.
8/18 USG: Gallbladder polyps up to 0.48 cm.
4/19 CBC N McHc static, Cr 116 LFT N, CaPO N, AFP N
10/19 AFP LFT n 
4/2020 LFT N AFP 4 
10/20 LFT N AFP 3
4/2021 LFT/AFP N
USG 7/2021 Gallbladder polyps (up to 0.6cm).
9/21  LFT/AFP N
2/22 USG liver: Gallbladder polyps (up to 0.65cm).
4/22 LFT N AFP N 
9/22 AFP N LFT N `,
output:`9/22 AFP N LFT N
4/22 LFT N AFP N
9/21 LFT / AFP N
4/21 LFT / AFP N
10/20 LFT N AFP 3
4/20 LFT N AFP 4
10/19 AFP LFT n
4/19 CBC N McHc static Cr 116 LFT N CaPO4 N AFP N


2/22 USG liver: Gallbladder polyps (up to 0.65cm).
7/21 USG Gallbladder polyps (up to 0.6cm).
8/18 USG Gallbladder polyps up to 0.48 cm.
9/15 USG → Static small gallbladder polyps.
`},
{
input:`5/18 24h urine protein 0.09, A1c 7.5, Hb 13.1 McHc RFT n, ALT 43, CaPO N, LDL 0.9, FG 8.3
9/18 HBsAg -ve anti HCV -ve A1c 7.3 CBC N FG 7.4 LFT N Fe Profile N 
1/19 FG 6.8 A1c 7.2 
5/19 - A1c 8.0 FG 8.8 L/RFT n Lipid N; UACR neg
9/19: A1c 7.8, FBS 7.8
12/2019: A1c 7.1, FG 6.8, LRFT N
5/20 ACR 3.3 A1c 6.7 CEA N, RFT N,FG 6.6 LDL 0.8
1/2021 ACR 3.8 A1c 7.2 FG 6.6 RFT N TG 1.1 LDL 0.9
5/21 A1c 7.6 LRFT N FG 8.5 TG 0.8 LDL 0.8 
3/2022: HbA1c 7.1 H  FBS 5.0  Cr 95  eGFR (CKD-EPI) 71  TC 2.9  HDL 1.5  LDL 1.1  TG 0.7  UACR 1.5
6/2022: HbA1c 8.1 H  FG 8.0 H
10/2022: HbA1c 7.5 H  FG 6.9 H  Cr 114 H  eGFR 57  TC 2.8  HDL 1.3  LDL 1.2  TG 0.7  UACR 1.4
1/2023: A1c 7.0 H  FG 6.9 H  Cr 113 H  eGFR 57`,
output:`1/23 A1c 7.0↑ FG 6.9↑ Cr 113↑ eGFR 57
10/22 A1c 7.5↑ FG 6.9↑ Cr 114↑ eGFR 57 TC 2.8 HDL 1.3 LDL 1.2 TG 0.7 ACR 1.4
6/22 A1c 8.1↑ FG 8.0↑
3/22 A1c 7.1↑ FG 5.0 Cr 95 eGFR 71 TC 2.9 HDL 1.5 LDL 1.1 TG 0.7 ACR 1.5
5/21 A1c 7.6 LRFT N FG 8.5 TG 0.8 LDL 0.8
1/21 ACR 3.8 A1c 7.2 FG 6.6 RFT N TG 1.1 LDL 0.9
5/20 ACR 3.3 A1c 6.7 CEA N RFT N FG 6.6 LDL 0.8
12/19 A1c 7.1 FG 6.8 LRFT N
9/19 A1c 7.8 FG 7.8
5/19 A1c 8.0 FG 8.8 LRFT n Lipid N ACR neg
1/19 FG 6.8 A1c 7.2
9/18 HBsAg -ve anti HCV -ve A1c 7.3 CBC N FG 7.4 LFT N Fe Profile N
5/18 24h urine protein 0.09 A1c 7.5 Hb 13.1 McHc RFT n ALT 43 CaPO4 N LDL 0.9 FG 8.3`
},
{
input:`1/2022: RFT N, K 4.0,  A1C 5.7, lipid 4.6/1.2/2.0/2.1
5/22 TC 5.6 HDL 1.8 LDL 3.1 TG 1.4 ALP 150↑ ALT N
10/22  CBP N  ALP 105   ALT 14  GGT 15  AFP 5   Ca/PO N   Lipid 4.5/0.8/1.7/2.4

1/2023: FG 6.6 H  Cr 69  eGFR 75  TC 6.5 H  HDL 2.0  LDL 3.9 H  TG 1.2  LFT n ALP 152 ↑
`,
output:`1/23 FG 6.6↑ Cr 69 eGFR 75 TC 6.5↑ HDL 2.0 LDL 3.9↑ TG 1.2 LFT n ALP 152↑
10/22 CBC N ALP 105 ALT 14 GGT 15 AFP 5 CaPO4 N Lipid 4.5/0.8/1.7/2.4
5/22 TC 5.6 HDL 1.8 LDL 3.1 TG 1.4 ALP 150↑ ALT N
1/22 RFT N K 4.0 A1c 5.7 Lipid 4.6/1.2/2.0/2.1
`
},
{
input:`2/20 ACR 0.5 a1c 10.4 CR 109 lipid 4/1.7/1.2/2.1 FG 13
5/2020 A1c 9.8  RFT N  FG 9.4  Lipid 3.4/1.1/1.1/1.8 
9/20: A1c 8.9, FG 9.1, Cr 103, LFT n
12/2020: LFT N, A1C 8.9, FBS 9.0
4/2021 ACR 0.7 A1c 9.1 FG 6.5 RFT N TC 4.0 TG 0.9 HDL 1.3 LDL 2.3
8/21 A1c 7.6 FG 8.1 Cr 102 N
12/21 HbA1c 8.8 H  FBS 8.1 H
4/2022: HbA1c 9.8 H  FG 8.5 H  Cr 100  eGFR 68  TC 4.0  HDL 1.2  LDL 2.1  TG 1.5  UACR 0.9
6/2022: HbA1c 8.4 H  FG 7.5 H  Cr 116 H  eGFR 57  TC 3.8  HDL 1.3  LDL 2.1  TG 1.0
7/22 MSU -ve
10/2022: HbA1c 9.4 H  FG 8.0 H  Cr 120 H  eGFR 54
1/2023: HbA1c 10.3 H  FG 8.7 H  Cr 126 H  eGFR 51`,
output:`1/23 A1c 10.3↑ FG 8.7↑ Cr 126↑ eGFR 51
10/22 A1c 9.4↑ FG 8.0↑ Cr 120↑ eGFR 54
6/22 A1c 8.4↑ FG 7.5↑ Cr 116↑ eGFR 57 TC 3.8 HDL 1.3 LDL 2.1 TG 1.0
4/22 A1c 9.8↑ FG 8.5↑ Cr 100 eGFR 68 TC 4.0 HDL 1.2 LDL 2.1 TG 1.5 ACR 0.9
12/21 A1c 8.8↑ FG 8.1↑
8/21 A1c 7.6 FG 8.1 Cr 102 N
4/21 ACR 0.7 A1c 9.1 FG 6.5 RFT N TC 4.0 TG 0.9 HDL 1.3 LDL 2.3
12/20 LFT N A1c 8.9 FG 9.0
9/20 A1c 8.9 FG 9.1 Cr 103 LFT n
5/20 A1c 9.8 RFT N FG 9.4 Lipid 3.4/1.1/1.1/1.8
2/20 ACR 0.5 A1c 10.4 Cr 109 Lipid 4/1.7/1.2/2.1 FG 13

7/22 MSU -ve
`
},{
input:`
28/11/2018 K 5.3 Cr 76 FBS 5.1 TC 4.8 TG 1.9 HDL 1.2 LDL 2.7
28/10/19  TGS 1.5 TC 5.1 HDL 1.1 LDL 3.3  RFT N FBS 5.5   CVDR >20

10/2018
Chest X-ray:
Heart size appeared normal.
No focal lung lesion is seen.
Slightly dense right upper hilum.
Suggest right lateral view for further evaluation

11/2018 x ray Chest (PA, right lateral)-
Lungs are clear.
Cardiothoracic ratio is normal.
No gross mass lesion is seen in the hilar regions.
Osteophytes are seen in the thoracic spine.
chest clear

10/18 ECG 83 bpm, SR, no ischemic changes`,
output:`10/19 TGS 1.5 TC 5.1 HDL 1.1 LDL 3.3 RFT N FG 5.5 CVDR >20
11/18 K 5.3 Cr 76 FG 5.1 TC 4.8 TG 1.9 HDL 1.2 LDL 2.7


11/18 XR Chest (PA, right lateral)-
Lungs are clear.
Cardiothoracic ratio is normal.
No gross mass lesion is seen in the hilar regions.
Osteophytes are seen in the thoracic spine.
chest clear
10/18 CXR 
Heart size appeared normal.
No focal lung lesion is seen.
Slightly dense right upper hilum.
Suggest right lateral view for further evaluation

10/18 ECG 83 bpm, SR, no ischemic changes
`
},{
input:`1/2023: A1c 5.9 H  FG 6.5 H  Cr 62  eGFR 91  TC 4.4  HDL 1.8  LDL 1.9  TG 1.5  UACR 1.5
 

4/19 FG 6.3 RFT n eGFR 74 Bone profile N except PO 1.5 TG 1.1 TC 3.8 HDL 1.4 LDL 1.9
7/20 FG 6.1 Cr 62 TC 3.3 TG 1.0 HDL 1.4 LDL 1.4
12/20 A1c 5.5 OGTT 6.0/13.4
5/21 OGTT 5.8/13.5
10/21 Fe 2 Fe sat 4% Ferritin 8 ACR 1.1 CBC Hb 7.5 A1c 5.5 RFT N FG 5.6 TC 3.8 TG 1.4 HDL 1.4 LDL 1.8
11/21 Hb 8.6 Plt 676
3/2022 Hb 10.8 McHc Fe def, A1c 5.8 H  FG 5.8 H  Cr 52  eGFR (CKD-EPI) 98  UACR 0.7
6/2022: Cr 57  eGFR 94  Hb 13.6  ALT 17 [U/L]  ALP 79 [U/L]

6/16 BONE DENSITOMETRY (DXA) REPORT
T-score over lumbar spine L1-L4 is -0.1.
T-score over hip region is -2.5.
Diagnosis is OSTEOPOROSIS according to WHO classification (lowest T-score -2.5 or less).
`,
output:`1/23 A1c 5.9↑ FG 6.5↑ Cr 62 eGFR 91 TC 4.4 HDL 1.8 LDL 1.9 TG 1.5 ACR 1.5
6/22 Cr 57 eGFR 94 Hb 13.6 ALT 17 ALP 79
3/22 Hb 10.8 McHc Fe def A1c 5.8↑ FG 5.8↑ Cr 52 eGFR 98 ACR 0.7
11/21 Hb 8.6 PLT 676
10/21 Fe 2 Fe sat 4% Ferritin 8 ACR 1.1 CBC Hb 7.5 A1c 5.5 RFT N FG 5.6 TC 3.8 TG 1.4 HDL 1.4 LDL 1.8
5/21 OGTT 5.8/13.5
12/20 A1c 5.5 OGTT 6.0/13.4
7/20 FG 6.1 Cr 62 TC 3.3 TG 1.0 HDL 1.4 LDL 1.4
4/19 FG 6.3 RFT n eGFR 74 Bone profile N except PO 1.5 TG 1.1 TC 3.8 HDL 1.4 LDL 1.9


6/16 DEXA 
T-score over lumbar spine L1-L4 is -0.1.
T-score over hip region is -2.5.
Diagnosis is OSTEOPOROSIS according to WHO classification (lowest T-score -2.5 or less).
`
},
{
input:`4/2021: ALT 100, AFP N , HBV DNA not detected
private USG abd 5/2021: mild to moderate fatty change in liver
private fibroscan 5/2021: liver stiffness 9.0kPa (boderline fibrosis), CAP 324dB/m ( severe liver steatosis)
6/21 ALT 85 FG 5.8 TC 6.5 TG 5.1 HDL 0.9 LDL *
9/21 AFP 4 ALT 191 TG 4.4
11/21 ALT 180 GGT 73 AST 118 RFT n HBV DNA (Viral Load) RT-PCR 11.8 IU/mL
1/2022: ALP 152, AST 102, GGT 76, AFP N, HBV DNA < 10IU/ ml, lipid 6.8/6.5/.9/TG*
5/2022: A1c 6.1 H  FG 5.5  TC 7.8 H  HDL 1.0 L  LDL *  TG 4.7 H  ALT 263 H [U/L]  ALP 87 [U/L], GGT 111
6/22 AFP N ALT 307 GGT 98 TC 7.8 TG 4.7 HDL 1.0 LDL cancelled Anti-HCV -ve anti-HAV -ve CBC N A1c 6.1 FG 5.5 CBC N clotting N

25/6/2022 private USG abd : moderate fatty liver. No other sonographic abnormality is detexted in thr liver
`,
output:`6/22 AFP N ALT 307 GGT 98 TC 7.8 TG 4.7 HDL 1.0 LDL cancelled Anti-HCV -ve anti-HAV -ve CBC N A1c 6.1 FG 5.5 CBC N Clotting N
5/22 A1c 6.1↑ FG 5.5 TC 7.8↑ HDL 1.0↓ LDL * TG 4.7↑ ALT 263↑ ALP 87 GGT 111
1/22 ALP 152 AST 102 GGT 76 AFP N HBVDNA < 10IU/ ml Lipid 6.8/6.5/.9/ TG *
11/21 ALT 180 GGT 73 AST 118 RFT n HBVDNA 11.8
9/21 AFP 4 ALT 191 TG 4.4
6/21 ALT 85 FG 5.8 TC 6.5 TG 5.1 HDL 0.9 LDL *
4/21 ALT 100 AFP N HBVDNA not detected


6/22 private USG abd : moderate fatty liver. No other sonographic abnormality is detexted in thr liver
5/21 private USG abd mild to moderate fatty change in liver
5/21 private Fibroscan liver stiffness 9.0kPa (boderline fibrosis), CAP 324dB/m ( severe liver steatosis)
`
},
{
input:`
Latest results retrieved from ePR within 16 weeks of this consultation:
1/2023: A1c 7.4 H  FG 7.2 H  Cr 56  eGFR 107  TC 4.2  HDL 1.3  LDL 2.5  TG 1.0  UACR 4.4 H  Hb 9.9 L  ALT 48 H [U/L]  ALP 95 [U/L]



9/2013 USG abdomen Fatty liver
6/2019 LFT N AFP N Hb 13.2 WBC 10.8 plt 379
10/2019: A1c 6.6, plt 468 otherwise CBC N, LFT N, AFP 3.3
3/20 HB N WCC 9.5 Plt 428 ↑  A1c 6.4 FG 5.8 LRFT N  AFP N  TG  1.0 TC 4.7 HDL 1.5 LDL  2.8 ACR 1.8
8/2020 A1c 6.4 CBC N LRFT N TG 1.1 LDL 3.4 AFP 3
4/2021 AFP 3 ALT 39
7/2021  CBC n A1c 6.7 H  FG 6.3 H  Cr 55  eGFR (CKD-EPI) 109  TC 5.7 H  HDL 1.4  LDL 3.5 H  TG 2.0 H  ALT 53 AFP n HBV DNA (Viral Load), RT-PCR 22.8 IU/mL  UACR 1.1
12/21 HBV DNA 34.1 AFP N ALT 45 TC 5.7 TG 2.2 HDL 1.4 LDL 3.4
5/2022: A1c 6.6 H  FG 6.9 H  Cr 55  eGFR 108  TC 5.4 H  HDL 1.7  LDL 3.4 H  TG 0.7  UACR 2.3  Hb 10.9 L  ALT 26 [U/L]  ALP 73 [U/L]
HBV DNA <10, AFP N
9/2022: Hb 12.0  ALT 35 [U/L]  ALP 84 [U/L]  TSH 2.0
`,
output:`1/23 A1c 7.4↑ FG 7.2↑ Cr 56 eGFR 107 TC 4.2 HDL 1.3 LDL 2.5 TG 1.0 ACR 4.4↑ Hb 9.9↓ ALT 48↑ ALP 95
9/22 Hb 12.0 ALT 35 ALP 84 TSH 2.0
5/22 A1c 6.6↑ FG 6.9↑ Cr 55 eGFR 108 TC 5.4↑ HDL 1.7 LDL 3.4↑ TG 0.7 ACR 2.3 Hb 10.9↓ ALT 26 ALP 73
 HBVDNA <10 AFP N
12/21 HBVDNA 34.1 AFP N ALT 45 TC 5.7 TG 2.2 HDL 1.4 LDL 3.4
7/21 CBC n A1c 6.7↑ FG 6.3↑ Cr 55 eGFR 109 TC 5.7↑ HDL 1.4 LDL 3.5↑ TG 2.0↑ ALT 53 AFP n HBVDNA 22.8 ACR 1.1
4/21 AFP 3 ALT 39
8/20 A1c 6.4 CBC N LRFT N TG 1.1 LDL 3.4 AFP 3
3/20 Hb N WCC 9.5 PLT 428↑ A1c 6.4 FG 5.8 LRFT N AFP N TG 1.0 TC 4.7 HDL 1.5 LDL 2.8 ACR 1.8
10/19 A1c 6.6 PLT 468 otherwise CBC N LFT N AFP 3.3
6/19 LFT N AFP N Hb 13.2 WBC 10.8 PLT 379


9/13 USG abdomen Fatty liver
`},
{
input:`Latest results retrieved from ePR within 16 weeks of this consultation:
1/2023: Hb 13.4↓  WCC PLT n A1c 7.4 H  FG 6.4 H  Cr 122 H  eGFR 47  TC 4.0  HDL 1.8  LDL 1.9  TG 0.8  UACR 171 H  LFT n UA 0.426

2/2020: Cr 110, eGFR 54, A1c 7.6, FG 8.2, lipild 4.7/1.6/1.5/2.4, ACr 16
2/21 ACR 16   A1c 7.6   Cr 138  eGFR 41   ALP 145  ALT 46   GGT 84   Ca/PO N   Lipid 4.3/0.9/1.8/2.1
6/21 Cr 137 ALP 139 static GGT 110 TG 1.9TC 4.4  HDL 1.9 LDL 1.7
5/2022: A1c 8.1 H  FG 6.0 H  Cr 121 H ↑ eGFR 47  TC 3.5  HDL 1.5  LDL 1.3  TG 1.5  UACR 24 H  Hb 9.9 L  ALT 11 [U/L]  ALP 93 [U/L]
8/2022: A1c 7.8 H  FG 8.5 H  Cr 146 H  eGFR 38  TC 4.7  HDL 1.9  LDL 2.1  TG 1.6  UACR 28 H  Hb 10.1 L
`,
output:`1/23 Hb 13.4↓ WCC PLT n A1c 7.4↑ FG 6.4↑ Cr 122↑ eGFR 47 TC 4.0 HDL 1.8 LDL 1.9 TG 0.8 ACR 171↑ LFT n UA 0.426
8/22 A1c 7.8↑ FG 8.5↑ Cr 146↑ eGFR 38 TC 4.7 HDL 1.9 LDL 2.1 TG 1.6 ACR 28↑ Hb 10.1↓
5/22 A1c 8.1↑ FG 6.0↑ Cr 121↑ eGFR 47 TC 3.5 HDL 1.5 LDL 1.3 TG 1.5 ACR 24↑ Hb 9.9↓ ALT 11 ALP 93
6/21 Cr 137 ALP 139 static GGT 110 TG 1.9TC 4.4 HDL 1.9 LDL 1.7
2/21 ACR 16 A1c 7.6 Cr 138 eGFR 41 ALP 145 ALT 46 GGT 84 CaPO4 N Lipid 4.3/0.9/1.8/2.1
2/20 Cr 110 eGFR 54 A1c 7.6 FG 8.2, lipild 4.7/1.6/1.5/2.4 ACR 16
`}
]

const opt = {rename: 'all', units: 'all', normalize: 'all', reorder: 'on-with-sort'}

describe('unit tests', function(){ 
    let lex = null

    beforeEach(function(){
        lex = new Lex("", {})
        lex.tokenize()
    })

    describe('after initialization', function(){
        it('should have empty tokens',function(){
            expect(lex.getTokens()).to.be.a('Array').with.lengthOf(0)
        })
        it('should output empty \\ns',function(){
            expect(lex.getIxList(true)).to.equal('\n')
        })
    })

    describe('date recognition', function(){
        it('should take 3 field dates',function(){
            expect(lex.toDate("12/10/2023").toLocaleDateString()).to.equal('12/10/2023')
            expect(lex.toDate("1/1/95").toLocaleDateString()).to.equal('01/01/1995')
            expect(lex.toDate("31/12/00").toLocaleDateString()).to.equal('31/12/2000')
            expect(lex.toDate("2-10-2011").toLocaleDateString()).to.equal('02/10/2011')
        })
        it('should take 2 field dates',function(){
            expect(lex.toDate("10/2023").toLocaleDateString()).to.equal('01/10/2023')
            expect(lex.toDate("1/95").toLocaleDateString()).to.equal('01/01/1995')
            expect(lex.toDate("12/00").toLocaleDateString()).to.equal('01/12/2000')
            expect(lex.toDate("10-2011").toLocaleDateString()).to.equal('01/10/2011')
        })
        it('should reject invalid dates',function(){
            expect(function(){lex.toDate("14/2023")}).to.throw()
            expect(function(){lex.toDate("1/202")}).to.throw()
            expect(function(){lex.toDate("0/1/00")}).to.throw()
            expect(function(){lex.toDate("2023/1/1")}).to.throw()
        })
    })

    describe ('integration tests', function(){
        let lex = null
    
        for (let i = 0; i < cases.length; i++){
            it('case '+i, function(){
                lex = new Lex(cases[i].input, opt)
                lex.tokenize()
                lex.sortByDate()
                expect(lex.getIxList(true)).to.equal(cases[i].output)
            })
        }
    })

})

