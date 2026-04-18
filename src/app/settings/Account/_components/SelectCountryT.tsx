"use client"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item"
import { useUserStore } from "@/store/store"
import { countries } from "countries-list"
import Fuse from "fuse.js"

// const countries = [
//   { code: "", value: "", continent: "", label: "Select country" },
//   {
//     code: "ar",
//     value: "argentina",
//     label: "Argentina",
//     continent: "South America",
//   },
//   { code: "au", value: "australia", label: "Australia", continent: "Oceania" },
//   { code: "br", value: "brazil", label: "Brazil", continent: "South America" },
//   { code: "ca", value: "canada", label: "Canada", continent: "North America" },
//   { code: "cn", value: "china", label: "China", continent: "Asia" },
//   {
//     code: "co",
//     value: "colombia",
//     label: "Colombia",
//     continent: "South America",
//   },
//   { code: "eg", value: "egypt", label: "Egypt", continent: "Africa" },
//   { code: "fr", value: "france", label: "France", continent: "Europe" },
//   { code: "de", value: "germany", label: "Germany", continent: "Europe" },
//   { code: "it", value: "italy", label: "Italy", continent: "Europe" },
//   { code: "jp", value: "japan", label: "Japan", continent: "Asia" },
//   { code: "ke", value: "kenya", label: "Kenya", continent: "Africa" },
//   { code: "mx", value: "mexico", label: "Mexico", continent: "North America" },
//   {
//     code: "nz",
//     value: "new-zealand",
//     label: "New Zealand",
//     continent: "Oceania",
//   },
//   { code: "ng", value: "nigeria", label: "Nigeria", continent: "Africa" },
//   {
//     code: "za",
//     value: "south-africa",
//     label: "South Africa",
//     continent: "Africa",
//   },
//   { code: "kr", value: "south-korea", label: "South Korea", continent: "Asia" },
//   {
//     code: "gb",
//     value: "united-kingdom",
//     label: "United Kingdom",
//     continent: "Europe",
//   },
//   {
//     code: "us",
//     value: "united-states",
//     label: "United States",
//     continent: "North America",
//   },
// ]

export function SelectCountryT({setSelect}:any) {

const user:any = useUserStore((state) => state.user);

        const countr = Object.entries(countries).map(([code,country]) => ({
            locationCode:code ,
            location:country?.name,
            phoneCode:country?.phone
        }))
    
    
        const fuse = new Fuse(countr, {
      keys: ["location"], 
      threshold: 0.3, 
    });
    

  return (
   <div className="">
            <h1 className="font-semibold text-sm">Location</h1>

     <Combobox
     defaultValue={user?.location}
    onValueChange={(e:any) => {
       const fullCountry = countr.find(c => c.location === e);

    if (fullCountry) {
      
      setSelect({
        locationCode: fullCountry.locationCode,
        location: fullCountry.location,
        phoneCode: fullCountry.phoneCode[0].toString()
      });
    }
    }}
      items={countr.filter((country) => country.locationCode !== "")}
      itemToStringValue={(country: (typeof countr)[number]) => country.location}
    >
      <ComboboxInput className={"mt-2 py-5"} placeholder="Search countries..." />
      <ComboboxContent>
        <ComboboxEmpty>No countries found.</ComboboxEmpty>
        <ComboboxList>
          {(country) => (
            <ComboboxItem key={country.locationCode} value={country.location}>
              <Item className="p-0">
                <ItemContent>
                  <ItemTitle className="whitespace-nowrap">
                              <span className={`fi fi-${country.locationCode.toLowerCase()}`} />
                    {country.location}
                  </ItemTitle>
                  <ItemDescription>
                    {country.location} ({country.locationCode})
                  </ItemDescription>
                </ItemContent>
              </Item>
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
   </div>
  )
}
