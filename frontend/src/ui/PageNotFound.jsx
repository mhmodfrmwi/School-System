import NotFound from '../assets/notfound2.png';
export default function PageNotFound() {
  return (
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
      <img src={NotFound} alt="Page Not Found" />
      <h1 style={{ marginTop: "20px", fontSize: "24px", fontFamily: "'Poppins', sans-serif", color: "#117C90", textAlign: "center" }}>
        Page Not Found
      </h1>
    </div>
  );
}
