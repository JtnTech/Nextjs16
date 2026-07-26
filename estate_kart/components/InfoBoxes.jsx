import Infobox from "./InfoBox";

const InfoBoxes = () => {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Infobox
            heading="For Renters"
            backgroundColor="bg-gray-100"
            ButtonInfo={{
              text: "Browse Properties",
              link: "/properties",
              backgroundColor: "bg-black",
            }}
          >
            Find your dream rental property. Bookmark properties and contact owners directly.
          </Infobox>

          <Infobox
            heading="For Property Owners"
            backgroundColor="bg-blue-100"
            ButtonInfo={{
              text: "Add Property",
              link: "/properties/add",
              backgroundColor: "bg-blue-500",
            }}
          >
            List your properties and reach potential tenants. Rent as an Airbnb or long term.
          </Infobox>
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
