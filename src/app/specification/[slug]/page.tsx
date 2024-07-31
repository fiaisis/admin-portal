import EditorContainer from "@/components/EditorContainer";
import InstrumentList from "@/components/InstrumentList";
import Box from "@mui/material/Box";

export const dynamicParams = false;

/* Instruments are being hardcoded due to potential issue fetching them from within 
github actions */
const instruments: string[] = [
  "ALF",
  "ARGUS",
  "CHIPLR",
  "CHRONUS",
  "CRISP",
  "EMU",
  "ENGINX",
  "GEM",
  "HET",
  "HIFI",
  "HRPD",
  "IMAT",
  "INES",
  "INTER",
  "IRIS",
  "LAD",
  "LARMOR",
  "LET",
  "LOQ",
  "MAPS",
  "MARI",
  "MERLIN",
  "MUSR",
  "NILE",
  "NIMROD",
  "OFFSPEC",
  "OSIRIS",
  "PEARL",
  "PEARL (HIPR)",
  "POLARIS",
  "POLREF",
  "PRISMA",
  "ROTAX",
  "SANDALS",
  "SANS2D",
  "SURF",
  "SXD",
  "TFXA",
  "TOSCA",
  "VESUVIO",
  "WISH",
  "ZOOM",
];

export async function generateStaticParams() {
  return instruments.map((instrument: string) => {
    return { slug: instrument };
  });
}

export default async function SpecificationEditor({
  params,
}: {
  params: { slug: string };
}) {
  const instrument = params.slug;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "95vh",
        pt: "6vh",
      }}
    >
      <InstrumentList selected={instrument} instruments={instruments} />
      <Box sx={{ flexGrow: 1, maxWidth: "85%" }}>
        <EditorContainer instrument={instrument} />
      </Box>
    </Box>
  );
}
