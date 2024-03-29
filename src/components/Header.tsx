import { View, Image, Text, TouchableOpacity } from "react-native"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import { Link } from "expo-router"

type HeaderProps = {
  title: string
  cartQuantityItems?: number
}

export function Header({ title, cartQuantityItems = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5">
      <View className="flex-1">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-slate-50 text-xl font-heading mt-2">{title}</Text>
      </View>

      {cartQuantityItems > 0 && (
        <Link href='/Cart'asChild>
          <TouchableOpacity className="relative">
            <View className="bg-lime-300 w-4 h-4 rounded-full items-center justify-center top-2 z-10 -right-3.5">
              <Text className="font-bold text-slate-900 text-xs">
                {cartQuantityItems}
              </Text>
            </View>

            <Feather name="shopping-bag" color={colors.slate[50]} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  )
}
