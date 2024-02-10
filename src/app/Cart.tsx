import { Header } from "@/components/Header"
import { CardProduct } from "@/components/CardProduct"
import { View, Text, ScrollView, Alert,Linking } from "react-native"
import { ProductCartProps, useCartStory } from "@/store/cart-story"
import { formatCurrency } from "@/utils/functions/formatCurrency"
import { Input } from "./Input"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { Button } from "@/components/Button"
import { Feather } from "@expo/vector-icons"
import colors from "tailwindcss/colors"
import { ButtonLink } from "@/components/LinkButton"
import { useState } from "react"
import { useNavigation } from "expo-router"

const PHONE_NUMBER = '5586998202735';

export default function Cart() {
  const [address, setAddress] = useState("")
  const cartStory = useCartStory()
  const navigation= useNavigation();

  const total = formatCurrency(
    cartStory.products.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    )
  )

  function handleRemoveProduct(product: ProductCartProps) {
    Alert.alert(
      "Remover",
      `Deseja remover o item ${product.title} do carrinho ?`,
      [
        {
          text: "Cancelar",
        },
        {
          text: "Ok",
          onPress: () => cartStory.remove(product.id),
        },
      ]
    )
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Pedido, informe os dados daentrega")
    }

    const product = cartStory.products.map(
      product => `\n ${product.quantity} ${product.title}`
    ).join('');

    const message = `
      Novo Pedido
      \n Entregar para ${address} 

      ${product}

      \n Valor Total: ${total}
    `

    Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

    cartStory.clear();
    navigation.goBack()
    
  }

  return (
    <View className="flex-1 pt-8">
      <Header title="Seu Carrinho " />
      <KeyboardAwareScrollView>
        <ScrollView>
          <View className="p-5 flex-1">
            {cartStory.products.length > 0 ? (
              <View className="border-b border-slate-700">
                {cartStory.products.map(product => (
                  <CardProduct
                    data={product}
                    key={product.id}
                    onPress={() => handleRemoveProduct(product)}
                  />
                ))}
              </View>
            ) : (
              <Text className="font-body text-slate-400 text-center my-8">
                Seu carrinho esta vazio.
              </Text>
            )}

            <View className="flex-row gap-2 items-center mt-5 mb-4">
              <Text className="font-subtitle text-white text-xl">Total</Text>
              <Text className="text-lime-400 text-2xl font-heading">
                {total}
              </Text>
            </View>

            <Input
              placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
              onChangeText={setAddress}
              onSubmitEditing={handleOrder}
              blurOnSubmit={true}
              returnKeyType="next"
            />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <View className="p-5 gap-5">
        <Button.Root onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={24} color={colors.black} />
          </Button.Icon>
        </Button.Root>
        <ButtonLink title="Voltar ao cardápio" href="/" />
      </View>
    </View>
  )
}
