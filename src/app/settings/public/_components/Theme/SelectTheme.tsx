import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function SelectTheme() {

    const changeTheme = localStorage?.getItem("theme") === "dark" ? "light" : "dark"
    const handleChange = (value:string) => {
      localStorage?.setItem("theme", value);
    }

  return (
    <Select onValueChange={(e) => handleChange(e)}>
      <SelectTrigger defaultValue={changeTheme} className="w-full max-w-48">
        <SelectValue placeholder="Select a Theme" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="light">Light</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
