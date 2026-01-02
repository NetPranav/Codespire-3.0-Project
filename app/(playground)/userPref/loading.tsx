export default function Loading() {
  return (
    <div
      style={{
        backgroundImage: `url('/userPrefLoader.png')`
      }}
      className={`h-screen w-screen fixed flex justify-center items-center backdrop-blur-sm z-99 top-0`}
    >
      <div
        style={{
          border: `10px solid gray`,
          borderTop: `10px solid #E1E0D9`,
        }}
        id={`loader`}
        className={`h-[100px] w-[100px] rounded-[50%] animate-spin`}
      ></div>
    </div>
  );
}
