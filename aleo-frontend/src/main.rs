use snarkvm::console::account::{
    // Address,
    private_key::*,
    signature::*,
    compute_key::*,
};
use snarkvm::console::network::prelude::*;
use snarkvm::console::program::{Identifier, Value, Plaintext};
use snarkvm::console::types::Field;
use snarkvm::prelude::Testnet3;
use indexmap::IndexMap;
use std::convert::TryFrom;
use dotenv::dotenv;
use std::env;

// /// Function to generate a random private key
// fn generate_private_key(rng: &mut TestRng) -> Result<PrivateKey<Testnet3>, String> {
//     PrivateKey::<Testnet3>::new(rng).map_err(|_| String::from("Failed to create private key"))
// }

fn generate_value() -> Value<Testnet3> {
    let mut map = IndexMap::new();
    for i in 0..8 {
        let identifier = Identifier::from_str(&format!("m{}", i)).unwrap();
        let plaintext = Plaintext::from_str(&format!("{}field", i + 1)).unwrap();
        map.insert(identifier, plaintext);
    }
    Value::Plaintext(Plaintext::Struct(map, Default::default()))
}

/// Generates a message from a value.
fn generate_message(value: &Value<Testnet3>) -> Vec<Field<Testnet3>> {
    value.to_fields().unwrap()
}

/// Function to sign a message
fn sign_message(private_key: &PrivateKey<Testnet3>, message: &[Field<Testnet3>], rng: &mut TestRng) -> Result<(Signature<Testnet3>, Field<Testnet3>), String> {
    // Ensure the number of field elements does not exceed the maximum allowed size.
    if message.len() > Testnet3::MAX_DATA_SIZE_IN_FIELDS as usize {
        return Err(String::from("Cannot sign the message: the message exceeds maximum allowed size"));
    }

    // Sample a random nonce from the scalar field.
    let nonce: Field<Testnet3> = Field::rand(rng);

    // Use the sign method to create a signature
    let signature = Signature::<Testnet3>::sign(private_key, message, rng)
        .map_err(|_| String::from("Failed to create signature"))?;

    Ok((signature, nonce))
}

/// Function to verify a signature
// fn verify_signature(signature: &Signature<Testnet3>, address: &Address<Testnet3>, message: &[Field<Testnet3>]) -> bool {
//     // Verify the signature against the address and the message
//     signature.verify(address, message)
// }

fn main() {
    dotenv().ok();
    let private_key_env = env::var("PRIVATE_KEY").expect("PRIVATE_KEY 환경 변수를 설정하세요.");

    // Random number generator
    let mut rng = TestRng::default();
    // Sample a random nonce from the scalar field.
    // let nonce:Field<Testnet3> = Field::rand(&mut rng);
    // println!("Nonce: {}", &nonce);

    // Generate a value and generate a message from it, then hash it.
    let value = generate_value();
    let message = generate_message(&value);
    // let hashed_message = <Testnet3>::hash_to_scalar_psd8(&message);

    // Generate a random private key
    //let private_key = generate_private_key(&mut rng).unwrap_or_else(|error| panic!("{}", error));
    let private_key = PrivateKey::<Testnet3>::from_str(private_key_env).unwrap();
    // println!("Private Key: {:?}", private_key);

    // let address = Address::try_from(&private_key).expect("Failed to create address");
    // println!("Address: {:?}", address);

    let compute_key = ComputeKey::try_from(&private_key).expect("Failed to create compute key");

    let pk_sig = compute_key.pk_sig();
    let pr_sig = compute_key.pr_sig();
    // let sk_sig = private_key.sk_sig();
    let sk_prf = compute_key.sk_prf();


   // Sign the message
    let (signature, _nonce) = sign_message(&private_key, &message, &mut rng)
        .unwrap_or_else(|error| panic!("{}", error));
    let sig_chal = signature.challenge();
    let sig_resp = signature.response();
    // let sig_comp = signature.compute_key();
    let sig_add = signature.to_address();
    // let g_r = <Testnet3>::g_scalar_multiply(&_nonce);

    println!("Address: {:?}", sig_add);

    println!("Challenge: {}", sig_chal);
    println!("Response: {}", sig_resp);
    println!("pk_sig: {}", pk_sig);
    println!("pr_sig: {}", pr_sig);
    println!("sk_prf: {}", sk_prf);
    println!("Nonce: {}", _nonce);   
    

    // println!("Signature: {signature}");
    // println!("g_r: {}", &g_r);
    // println!("ComputeKey: {:?}", sig_comp);
    
    // // Construct the hash input as (r * G, pk_sig, pr_sig, address, message).
    // let mut preimage = Vec::with_capacity(4 + message.len());
    // preimage.extend([g_r, pk_sig, pr_sig, *address].map(|point| point.to_x_coordinate()));
    // preimage.extend(&message);

    // let challenge = <Testnet3>::hash_to_scalar_psd8(&preimage);
    // println!("Challenge {:?}", challenge);
    // let response = nonce - (challenge.unwrap() * sk_sig);
    // println!("Response {}", response);ㄴ

}