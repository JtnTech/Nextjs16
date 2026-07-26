import PropertyEditForm from "@/components/PropertyEditForm";

const page = () => {
  return <section className="min-h-screen bg-gradient-to-br from-blue-50 via-slate-50 to-indigo-100 py-8 sm:py-10 lg:py-14">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="
          bg-white
          rounded-3xl
          border border-gray-200
          shadow-xl
          hover:shadow-2xl
          transition-all
          duration-300
          p-5
          sm:p-8
          md:p-10
          lg:p-12
        "
          >
            <PropertyEditForm />
          </div>
        </div>
      </section>
};

export default page;
