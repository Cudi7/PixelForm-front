import { User } from "./interfaces/user.interface";
import { Text } from "./interfaces/text.interface";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) return -1;

  if (b[orderBy] > a[orderBy]) return 1;

  return 0;
}

export type Order = "asc" | "desc";

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: string }, b: { [key in Key]: string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyUserSortFilter(
  userArr: User[],
  query: string,
  selectedFilter: string
) {
  const arrayWithFullStringVal = userArr.map((el) => {
    return {
      ...el,
      fullString: `${el.nombre} ${el.apellido1} ${el.apellido2} ${el.email} ${el.role} ${el.telefono}`,
    };
  });

  if (selectedFilter === "all") {
    return arrayWithFullStringVal.filter((el) =>
      el.fullString.toLowerCase().includes(query.toLowerCase())
    );
  }

  return arrayWithFullStringVal.filter(
    (el) =>
      el.fullString.toLowerCase().includes(query.toLowerCase()) &&
      el.role.toLowerCase().includes(selectedFilter)
  );
}

export function applyTextSortFilter(
  textArr: Text[],
  query: string,
  selectedFilter: string
) {
  const arrayWithFullStringVal = textArr.map((el) => {
    return {
      ...el,
      fullString: `${el.type} ${el.title} ${el.description}`,
    };
  });

  if (selectedFilter === "all") {
    return arrayWithFullStringVal.filter((el) =>
      el.fullString.toLowerCase().includes(query.toLowerCase())
    );
  }

  return arrayWithFullStringVal.filter(
    (el) =>
      el.fullString.toLowerCase().includes(query.toLowerCase()) &&
      el.type.toLowerCase().includes(selectedFilter)
  );
}
