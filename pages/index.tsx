import Head from 'next/head'
import { MouseEventHandler, ChangeEventHandler, useState } from 'react';
import data from "../script.json"
import { motion } from "framer-motion"

export default function Home() {
  const [current, setCurrent] = useState(0);
  const [filter, setFilter] = useState("all");
  let roles = data.map((item) => Object.keys(item)[0])
  roles = roles.filter((item, index) => roles.indexOf(item) === index);

  return (
    <div>
      <Head>
        <title>Script App</title>
        <meta
          name="description"
          content="Easily organize and display your lines for any script"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {data
          .filter((item) => Object.keys(item)[0] == filter || filter == "all")
          .map((item, index) => (
            <Card
              onClick={() => setCurrent(current + 1 == data.filter((item) => Object.keys(item)[0] == filter || filter == "all").length ? 0 : current+1)}
              title={Object.keys(item)[0]}
              line={item[Object.keys(item)[0]]}
              id={index}
              key={index}
              current={current}
            />
          ))}
        <Dropdown items={roles} value={filter} onChange={(e) => setFilter(e.target.value)} />
      </main>

      <footer>
        <a href="https://github.com/BlueZeeKing">BlueZeeKing24</a>
      </footer>
    </div>
  );
}

const capitalize = (items: string) => (
  items.split(" ").map((item) => item[0].toUpperCase() + item.slice(1)).join(" ")
)

function Card(props: {title: string, line: string, id: number, current: number, onClick: MouseEventHandler<HTMLDivElement>}) {
  return (
    <motion.div
      onClick={props.onClick}
      animate={{ x: `${(props.id - props.current) * 100}vw` }}
      transition={{ type: "tween", ease: "easeInOut" }}
      className="w-full h-full absolute bg-slate-100 place-content-center p-8"
    >
      <div className="w-full h-full bg-white place-content-center grid text-center">
        <h2 className="text-6xl font-bold p-8">{capitalize(props.title)}:</h2>
        <p className="text-4xl p-8">{props.line}</p>
      </div>
    </motion.div>
  );
}

function Dropdown(props: {
  items: string[];
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
}) {
  return (
    <div className="absolute z-50 top-0 left-0">
      <label htmlFor="role">Choose your role: </label>
      <select
        name="role"
        id="role"
        value={props.value}
        onChange={props.onChange}
      >
        {props.items.map((item) => (
          <option key={item} value={item}>
            {capitalize(item)}
          </option>
        ))}
        <option key="all" value="all">
          All
        </option>
      </select>
    </div>
  );
}