import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectLang() {

    const changeLanger = localStorage?.getItem("lang") || "en"
    const handleChange = (value:string) => {
      localStorage?.setItem("lang", value);
    }

  return (
    <Select onValueChange={(e) => handleChange(e)}>
      <SelectTrigger defaultValue={changeLanger} className="w-full max-w-48">
        <SelectValue placeholder="Select a Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="en">English</SelectItem>
          <SelectItem value="ar">Arabic</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
