import EditorContainer from "@/components/EditorContainer";
import InstrumentList from "@/components/InstrumentList";
import Box from "@mui/material/Box";

export const dynamicParams = false;
const API_BASE_URL = process.env.API_BASE_URL;

async function getInstruments() {
  const res = await fetch(`${API_BASE_URL}/instrument`);
  const result = await res.json();

  return result;
}

// whilst API changes are pending, extraction of names is required
function extract_instrument_names(instruments: { instrument_name: string }[]) {
  return instruments.map((element) => element["instrument_name"]).sort();
}

export async function generateStaticParams() {
  let instruments = await getInstruments();
  instruments = extract_instrument_names(instruments);
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
  const instruments = await getInstruments();

  const instrument_names = extract_instrument_names(instruments);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          objectFit: "contains",
          height: "75vh",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <InstrumentList
            selected={instrument}
            instruments={instrument_names}
          />
        </Box>
        <Box sx={{ flex: 7 }}>
          <EditorContainer instrument={instrument} />
        </Box>
      </Box>
    </>
  );
}
