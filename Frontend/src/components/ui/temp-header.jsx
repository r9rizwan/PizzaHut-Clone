import UserMenu from "./userMenu";

export const TempHeader = () => {
  return (
    <header className="flex flex-col items-center justify-between w-screen bg-primary px-2 h-28 shadow-md z-10">
      <div className="flex w-full items-end justify-end">
        <UserMenu />
      </div>
    </header>
  );
};
