import { TouchableOpacity, TouchableOpacityProps } from "react-native"

type ButtonRootProps = TouchableOpacityProps & {
  children: React.ReactNode
}

export function ButtonRoot({ children, ...rest }: ButtonRootProps) {
  return (
    <TouchableOpacity
      {...rest}
      className="flex-row gap-2 bg-lime-400 rounded-md h-12 items-center justify-center"
      activeOpacity={0.7}
    >
      {children}
    </TouchableOpacity>
  )
}
