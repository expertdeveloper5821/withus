import Footer from 'components/layout/footer';

export default function FiveStarRatedLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="bg-white">
        
        {children}
      </div>
      <Footer />
    </>
  );
}
