# Loop Heating Calculator

A lab-floor web app for setting up induced-current heating of cable loops, for tests at elevated conductor temperature on MV and HV cables.

**Open the app:** https://jwkrops.github.io/LoopHeatingCalculator/

Enter the cable cross-section, cable type, loop size and room temperature. The app shows:

- the heating current at the start (10 % extra) and while holding temperature,
- how many heating and compensation transformers are needed,
- how to wire the capacitor cans on each compensation transformer, with a diagram,
- the expected heating transformer input voltage and capacitor voltage.

It can aim for full compensation, or for a chosen heating transformer input voltage. A higher input voltage gives finer regulation on the autotransformer, so the loop is then deliberately under- or over-compensated.

The app works offline once it has been opened on a device, and remembers the last inputs on that device.

## How it works

**Heating current.** A steady-state heat balance per metre of cable in free air: conductor AC resistance at 97.5 °C with skin effect, the thermal resistances of the XLPE insulation and PE oversheath, and natural convection plus radiation from the surface. The external heat transfer carries a calibration factor of 0.75, fitted on measured heating of 150–1200 mm² cables. MV cables use typical insulation thicknesses per voltage class; for HV cables the insulation thickness comes from the datasheet, with segmental (Milliken) conductors handled separately.

**Loop reactance.** Calculated from the loop geometry with Grover's formula for a rectangular loop. Expect roughly ±10–15 % in practice, since nearby steel, the floor and screen currents are not included.

**Compensation.** Series capacitors connected through 1:40 or 1:80 transformers cancel the loop reactance. The app searches the capacitor configurations that one or two cans can make (400 V, 2 × 497.5 µF per can) and picks the setup closest to the aim while respecting the transformer and capacitor voltage limits.

## Fixed assumptions

Conductor 97.5 °C, XLPE insulation, PE oversheath, 50 Hz, 10 % start-up overcurrent, 1:80 transformers max 230 V, 1:40 transformers max 400 V. These match one specific lab setup; adapt them in `index.html` for your own equipment.

## QR labels

`QR_labels_transformers.pdf` holds labels for the transformers (Avery L7163 layout, 14 per A4 sheet). Scanning a label opens the app with both transformer ratios already set:

- 1:80 transformers: `https://jwkrops.github.io/LoopHeatingCalculator/?t=80`
- 1:40 transformers: `https://jwkrops.github.io/LoopHeatingCalculator/?t=40`

## Disclaimer

This is an engineering aid, not a substitute for judgement. Check the proposed setup, keep within your equipment ratings, and watch the first heating cycle with a temperature reference cable. See `LICENSE` for the full no-warranty terms.

## Updating

Upload the new `index.html`, change the version in its footer, and change `VERSION` in `sw.js` to the same number. The version change makes devices replace their offline copy.

## Licence

MIT, © 2026 Jan Willem Krops.
