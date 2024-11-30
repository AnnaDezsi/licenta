import { TextParser } from "../components/TextParser/TextParser"
import { parserMockupTextExample } from "../mockup_data/parserTest"

export const Dashboard = () => {

  return (
    <div>
      <TextParser text={parserMockupTextExample}/>
    </div>
  )
}
