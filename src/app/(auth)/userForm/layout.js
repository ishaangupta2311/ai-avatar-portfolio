export default function UserFormLayout({ children }){
  return (
    <section>
      <div className="flex justify-center items-center h-screen">
        {children}
      </div>
    </section>
  );
}

