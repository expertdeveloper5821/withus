import Footer from 'components/layout/footer';

export default function BestSellingLayout({
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
