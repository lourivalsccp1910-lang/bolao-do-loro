import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

export default function Content({ children }: Props) {
  return (
    <Box
      sx={{
        flex: 1,
        padding: 3,
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
}