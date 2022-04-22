import { PersonDto } from '../contracts';
import { EOperands } from '../constants';

export function rolesCountHelper(operand: EOperands, value: number): (person: PersonDto) => boolean {
  switch(operand) {
    case EOperands.GT:
      return (person: PersonDto) => person.characters?.length > value;
      break;
    case EOperands.GTE:
      return (person: PersonDto) => person.characters?.length >= value;
      break;
    case EOperands.LT:
      return (person: PersonDto) => person.characters?.length < value;
      break;
    case EOperands.LTE:
      return (person: PersonDto) => person.characters?.length <= value;
      break;
    case EOperands.IS:
      return (person: PersonDto) => person.characters?.length === value;
      break;
    case EOperands.NOT:
      return (person: PersonDto) => person.characters?.length !== value;
      break;
  }
}
