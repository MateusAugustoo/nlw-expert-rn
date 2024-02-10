import { forwardRef } from "react"
import { Image, ImageProps, TouchableOpacity, View, Text, TouchableOpacityProps } from "react-native"

type ProductDataProps = {
  title: string
  description: string
  thumbnail: ImageProps
  quantity?: number
}

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps
}

export const CardProduct = forwardRef<TouchableOpacity, ProductProps>(
  ({ data, ...rest }, ref) => {
    return (
      <TouchableOpacity
        ref={ref}
        className="w-full flex-row items-center pb-4"
        {...rest}
      >
        <Image
          source={data.thumbnail}
          alt="imagens dos produtos"
          className="w-20 h-20 rounded-md"
        />
        <View className="flex-1 ml-3">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-100 font-subtitle text-base">
              {data.title}
            </Text>

            {data.quantity && (
              <Text className="text-slate-400 font-subtitle text-sm">
                x{data.quantity}
              </Text>
            )}
          </View>

          <Text className="text-slate-100 text-xs leading-5 mt-0.5">
            {data.description}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }
)
