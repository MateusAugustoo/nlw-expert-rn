import { View, Image, Text } from "react-native"
import { useLocalSearchParams, useNavigation } from "expo-router"
import { PRODUCTS } from "@/utils/data/products"
import { formatCurrency } from "@/utils/functions/formatCurrency"
import { useCartStory } from "@/store/cart-story"
import { Redirect } from "expo-router"

import { Button } from "@/components/Button"
import { Feather } from "@expo/vector-icons"
import { ButtonLink } from "@/components/LinkButton"

export default function Product() {
  const cartStore = useCartStory()
  const { id } = useLocalSearchParams()
  const navigation = useNavigation()

  const product = PRODUCTS.find(item => item.id === id)

  function handleAddToCart() {
    if (product) {
      cartStore.add(product)
      navigation.goBack()
    }
  }

  if (!product) {
    return <Redirect href="/" />
  }

  return (
    <View className="flex-1">
      <Image
        source={product.cover}
        alt={`Imagem ilustrativa do ${product.title}`}
        className="w-full h-52"
        resizeMode="cover"
      />
      <View className="p-5 mt-7 flex-1 mb-5">
        <Text className="font-semibold text-slate-100 leading-7 text-xl">
          {product.title}
        </Text>
        <Text className="font-semibold text-lime-400 text-3xl leading-8 my-2">
          {formatCurrency(product.price)}
        </Text>
        <Text className="text-slate-400 font-body text-base leading-6 mb-6">
          {product.description}
        </Text>

        {product.ingredients.map((ingredient, index) => (
          <Text
            key={index}
            className="text-slate-400 font-body text-base leading-6"
          >
            {"\u2022"} {ingredient}
          </Text>
        ))}
      </View>

      <View className="p-5 pb-8 gap-5">
        <Button.Root onPress={handleAddToCart}>
          <Button.Icon>
            <Feather name="plus-circle" color="black" size={24} />
          </Button.Icon>
          <Button.Text>Adicionar ao Pedido</Button.Text>
        </Button.Root>

        <ButtonLink title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
